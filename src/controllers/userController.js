const mongoose = require('mongoose');
const userService = require('../services/userService');

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

async function index(req, res, next) {
  try {
    const { users, total, page, totalPages, pageSize } = await userService.getAll(req.query);
    const flash = req.query.flash || null;
    res.render('users/index', {
      title: 'Quản lý người dùng',
      users,
      query: req.query,
      flash,
      pagination: { total, page, totalPages, pageSize },
      request: req,
    });
  } catch (err) {
    next(err);
  }
}

async function getEdit(req, res, next) {
  if (!isValidId(req.params.id)) {
    return res.redirect('/users');
  }
  try {
    const target = await userService.getById(req.params.id);
    if (!target) {
      return res.redirect('/users');
    }
    res.render('users/edit', {
      title: 'Chỉnh sửa người dùng',
      target,
      error: null,
      request: req,
    });
  } catch (err) {
    next(err);
  }
}

async function postUpdateRole(req, res, _next) {
  if (!isValidId(req.params.id)) {
    return res.redirect('/users');
  }
  const { role } = req.body;
  try {
    await userService.updateRole(req.params.id, role, req.user.id);
    res.redirect('/users?flash=role_updated');
  } catch (err) {
    const target = await userService.getById(req.params.id).catch(() => null);
    res.render('users/edit', {
      title: 'Chỉnh sửa người dùng',
      target,
      error: err.message,
      request: req,
    });
  }
}

async function postResetPassword(req, res, _next) {
  if (!isValidId(req.params.id)) {
    return res.redirect('/users');
  }
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    const target = await userService.getById(req.params.id).catch(() => null);
    return res.render('users/edit', {
      title: 'Chỉnh sửa người dùng',
      target,
      error: 'Mật khẩu mới phải có ít nhất 6 ký tự.',
      request: req,
    });
  }
  try {
    await userService.resetPassword(req.params.id, newPassword, req.user.id);
    res.redirect('/users?flash=password_reset');
  } catch (err) {
    const target = await userService.getById(req.params.id).catch(() => null);
    res.render('users/edit', {
      title: 'Chỉnh sửa người dùng',
      target,
      error: err.message,
      request: req,
    });
  }
}

async function postDelete(req, res, next) {
  if (!isValidId(req.params.id)) {
    return res.redirect('/users');
  }
  try {
    await userService.deleteUser(req.params.id, req.user.id);
    res.redirect('/users?flash=deleted');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, getEdit, postUpdateRole, postResetPassword, postDelete };
