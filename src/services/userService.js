const bcrypt = require('bcrypt');
const User = require('../models/User');

async function getAll({ page = 1, search = '' } = {}) {
  const pageSize = 20;
  const filter = search ? { username: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } } : {};

  const [users, total] = await Promise.all([
    User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize),
    User.countDocuments(filter),
  ]);

  return {
    users,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / pageSize),
    pageSize,
  };
}

async function getById(id) {
  return User.findById(id).select('-password');
}

async function updateRole(id, role, adminId) {
  if (String(id) === String(adminId)) {
    throw new Error('Không thể thay đổi vai trò của chính mình.');
  }
  const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
  if (!user) {
    throw new Error('Người dùng không tồn tại.');
  }
  return user;
}

async function resetPassword(id, newPassword, adminId) {
  if (String(id) === String(adminId)) {
    throw new Error('Hãy dùng tính năng đổi mật khẩu cá nhân.');
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  const user = await User.findByIdAndUpdate(id, { password: hashed }, { new: true }).select('-password');
  if (!user) {
    throw new Error('Người dùng không tồn tại.');
  }
  return user;
}

async function deleteUser(id, adminId) {
  if (String(id) === String(adminId)) {
    throw new Error('Không thể xóa tài khoản của chính mình.');
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('Người dùng không tồn tại.');
  }
}

module.exports = { getAll, getById, updateRole, resetPassword, deleteUser };
