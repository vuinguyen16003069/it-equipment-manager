const notificationService = require('../services/notificationService');

/**
 * GET /api/notifications
 * Lấy danh sách thông báo hệ thống + thiết bị
 */
async function getNotifications(_req, res, next) {
  try {
    const notifications = await notificationService.getAll();
    res.json({ notifications });
  } catch (err) {
    next(err);
  }
}

module.exports = { getNotifications };
