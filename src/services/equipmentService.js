const Equipment = require('../models/Equipment');

const PAGE_SIZE = 10;

/** Escape regex special chars để tránh ReDoS */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getAll(query = {}) {
  const { search, type, status, page = 1 } = query;
  const filter = {};

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

async function getById(id) {
  return Equipment.findById(id).lean();
}

async function create(data) {
  return Equipment.create(data);
}

async function update(id, data) {
  return Equipment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function remove(id) {
  return Equipment.findByIdAndDelete(id);
}

module.exports = { getAll, getById, create, update, remove };
