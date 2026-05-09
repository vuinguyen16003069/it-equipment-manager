const mongoose = require('mongoose');
const { equipmentSchema } = require('../helpers/validation');
const { EQUIPMENT_TYPES, EQUIPMENT_STATUSES } = require('../helpers/constants');
const equipmentService = require('../services/equipmentService');
const multer = require('multer');
const imgbb = require('../helpers/imgbb');

// Cấu hình multer lưu vào bộ nhớ tạm để upload lên ImgBB
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // Giới hạn 25MB
});

const FLASH_MESSAGES = {
  created: 'Đã thêm thiết bị thành công.',
  updated: 'Đã cập nhật thiết bị thành công.',
  deleted: 'Đã xóa thiết bị thành công.',
};

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

async function index(req, res, next) {
  try {
    const { items, total, page, totalPages, pageSize } = await equipmentService.getAll(req.user.id, req.user.role, req.query);
    const flash = FLASH_MESSAGES[req.query.flash] || null;
    res.render('equipment/index', {
      title: 'Danh sách thiết bị',
      items,
      query: req.query,
      flash,
      pagination: { total, page, totalPages, pageSize },
      EQUIPMENT_TYPES,
      EQUIPMENT_STATUSES,
      request: req,
    });
  } catch (err) {
    next(err);
  }
}

function getCreate(req, res) {
  res.render('equipment/create', {
    title: 'Thêm thiết bị',
    error: null,
    EQUIPMENT_TYPES,
    EQUIPMENT_STATUSES,
    request: req,
  });
}

async function postCreate(req, res, _next) {
  const { error, value } = equipmentSchema.validate(req.body);
  if (error) {
    return res.render('equipment/create', {
      title: 'Thêm thiết bị',
      error: error.details[0].message,
      EQUIPMENT_TYPES,
      EQUIPMENT_STATUSES,
      request: req,
    });
  }
  try {
    // Xử lý upload ảnh nếu có
    if (req.file) {
      const imageUrl = await imgbb.upload(req.file.buffer, req.file.originalname);
      value.imageUrl = imageUrl;
    }

    await equipmentService.create(value, req.user.id);
    res.redirect('/equipment?flash=created');
  } catch (err) {
    const msg = err.code === 11000 ? 'Số serial đã tồn tại trong hệ thống.' : err.message;
    res.render('equipment/create', {
      title: 'Thêm thiết bị',
      error: msg,
      EQUIPMENT_TYPES,
      EQUIPMENT_STATUSES,
      request: req,
    });
  }
}

async function getEdit(req, res, next) {
  if (!isValidId(req.params.id)) {
    return res.redirect('/equipment');
  }
  try {
    const item = await equipmentService.getById(req.params.id, req.user.id, req.user.role);
    if (!item) {
      return res.redirect('/equipment');
    }
    res.render('equipment/edit', {
      title: 'Sửa thiết bị',
      item,
      error: null,
      EQUIPMENT_TYPES,
      EQUIPMENT_STATUSES,
      request: req,
    });
  } catch (err) {
    next(err);
  }
}

async function postEdit(req, res, _next) {
  if (!isValidId(req.params.id)) {
    return res.redirect('/equipment');
  }
  const { error, value } = equipmentSchema.validate(req.body);
  if (error) {
    const item = await equipmentService.getById(req.params.id, req.user.id, req.user.role);
    return res.render('equipment/edit', {
      title: 'Sửa thiết bị',
      item,
      error: error.details[0].message,
      EQUIPMENT_TYPES,
      EQUIPMENT_STATUSES,
      request: req,
    });
  }
  try {
    // Xử lý upload ảnh nếu có
    if (req.file) {
      const imageUrl = await imgbb.upload(req.file.buffer, req.file.originalname);
      value.imageUrl = imageUrl;
    }

    await equipmentService.update(req.params.id, value, req.user.id, req.user.role);
    res.redirect('/equipment?flash=updated');
  } catch (err) {
    const item = await equipmentService.getById(req.params.id, req.user.id, req.user.role);
    const msg = err.code === 11000 ? 'Số serial đã tồn tại trong hệ thống.' : err.message;
    res.render('equipment/edit', {
      title: 'Sửa thiết bị',
      item,
      error: msg,
      EQUIPMENT_TYPES,
      EQUIPMENT_STATUSES,
      request: req,
    });
  }
}

async function deleteEquipment(req, res, next) {
  if (!isValidId(req.params.id)) {
    return res.redirect('/equipment');
  }
  try {
    await equipmentService.remove(req.params.id, req.user.id, req.user.role);
    res.redirect('/equipment?flash=deleted');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, getCreate, postCreate, getEdit, postEdit, deleteEquipment, upload };
