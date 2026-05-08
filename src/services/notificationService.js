const Equipment = require('../models/Equipment');

const STATUS_LABEL = {
  available: 'Có sẵn',
  'in-use': 'Đang dùng',
  maintenance: 'Bảo trì',
  retired: 'Thanh lý',
};

/**
 * Lấy thông báo hệ thống (sẽ để trống nếu chưa có model Notification)
 */
async function getSystemNotifications() {
  try {
    // TODO: Uncomment khi model Notification được tạo
    // const notifications = await Notification.find({})
    //   .sort({ createdAt: -1 })
    //   .limit(4)
    //   .select('title subtitle isNew createdAt');
    // return notifications.map((n) => ({
    //   id: n._id,
    //   title: n.title,
    //   subtitle: n.subtitle,
    //   time: n.createdAt,
    //   isNew: n.isNew,
    // }));
    return [];
  } catch {
    return [];
  }
}

/**
 * Lấy thông báo thiết bị (equipment mới/vừa cập nhật)
 */
async function getEquipmentNotifications() {
  try {
    const recent = await Equipment.find({})
      .sort({ updatedAt: -1 })
      .limit(4)
      .select('name type status updatedAt createdAt');

    return recent.map((item) => {
      const isNew = Date.now() - new Date(item.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
      return {
        id: item._id,
        title: item.name,
        subtitle: `${item.type} · ${STATUS_LABEL[item.status] || item.status}`,
        time: item.updatedAt,
        isNew,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Lấy và merge tất cả notifications, sắp xếp theo thời gian, lấy top 8
 */
async function getAll() {
  const [systemNotifications, equipmentNotifications] = await Promise.all([
    getSystemNotifications(),
    getEquipmentNotifications(),
  ]);

  const notifications = [...systemNotifications, ...equipmentNotifications]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 8);

  return notifications;
}

module.exports = { getSystemNotifications, getEquipmentNotifications, getAll };
