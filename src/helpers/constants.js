const EQUIPMENT_TYPES = ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse', 'Server', 'Printer', 'Network', 'Other'];

const EQUIPMENT_STATUSES = ['available', 'in-use', 'maintenance', 'retired'];

const EQUIPMENT_STATUS_LABELS = {
  available: 'Có sẵn',
  'in-use': 'Đang sử dụng',
  maintenance: 'Bảo trì',
  retired: 'Đã thanh lý',
};

module.exports = { EQUIPMENT_TYPES, EQUIPMENT_STATUSES, EQUIPMENT_STATUS_LABELS };
