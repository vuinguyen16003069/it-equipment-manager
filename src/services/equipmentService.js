const Equipment = require('../models/Equipment');

const PAGE_SIZE = 10;

/** Escape regex special chars để tránh ReDoS */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getAll(userId, userRole, query = {}) {
  const { search, type, status, page = 1 } = query;
  const filter = {};

  // Ràng buộc quyền: Chỉ Admin mới được xem tất cả, User chỉ xem của mình
  if (userRole !== 'admin') {
    filter.owner = userId;
  }

  if (search?.trim()) {
    filter.name = { $regex: escapeRegex(search.trim()), $options: 'i' };
  }
  if (type) {
    filter.type = type;
  }
  if (status) {
    filter.status = status;
  }

  const pageNum = Math.max(1, Number.parseInt(page) || 1);
  const skip = (pageNum - 1) * PAGE_SIZE;

  const [items, total] = await Promise.all([
    Equipment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(PAGE_SIZE).lean(),
    Equipment.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / PAGE_SIZE) || 1,
    pageSize: PAGE_SIZE,
  };
}

async function getById(id, userId, userRole) {
  const item = await Equipment.findById(id).lean();
  if (!item) {
    return null;
  }

  // Kiểm tra quyền sở hữu
  if (userRole !== 'admin' && item.owner.toString() !== userId.toString()) {
    throw new Error('Bạn không có quyền truy cập thiết bị này.');
  }

  return item;
}

async function create(data, userId) {
  return Equipment.create({ ...data, owner: userId });
}

async function update(id, data, userId, userRole) {
  const item = await Equipment.findById(id);
  if (!item) {
    throw new Error('Thiết bị không tồn tại.');
  }

  // Kiểm tra quyền sở hữu trước khi cập nhật
  if (userRole !== 'admin' && item.owner.toString() !== userId.toString()) {
    throw new Error('Bạn không có quyền thay đổi thiết bị này.');
  }

  Object.assign(item, data);
  return item.save();
}

async function remove(id, userId, userRole) {
  const item = await Equipment.findById(id);
  if (!item) {
    throw new Error('Thiết bị không tồn tại.');
  }

  // Kiểm tra quyền sở hữu trước khi xóa
  if (userRole !== 'admin' && item.owner.toString() !== userId.toString()) {
    throw new Error('Bạn không có quyền xóa thiết bị này.');
  }

  return item.deleteOne();
}

async function getStats(userId, userRole) {
  const filter = {};
  if (userRole !== 'admin') {
    filter.owner = userId;
  }

  const [total, available, inUse, maintenance, retired] = await Promise.all([
    Equipment.countDocuments(filter),
    Equipment.countDocuments({ ...filter, status: 'available' }),
    Equipment.countDocuments({ ...filter, status: 'in-use' }),
    Equipment.countDocuments({ ...filter, status: 'maintenance' }),
    Equipment.countDocuments({ ...filter, status: 'retired' }),
  ]);

  return { total, available, inUse, maintenance, retired };
}

module.exports = { getAll, getById, create, update, remove, getStats };
