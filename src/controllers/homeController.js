const equipmentService = require('../services/equipmentService');
const User = require('../models/User');

async function index(req, res, next) {
  try {
    // Nếu người dùng đã đăng nhập, hiện Dashboard
    if (res.locals.user) {
      const stats = await equipmentService.getStats(res.locals.user.id, res.locals.user.role);
      let userCount = 0;
      if (res.locals.user.role === 'admin') {
        userCount = await User.countDocuments();
      }
      return res.render('home', {
        title: 'Bảng điều khiển',
        stats,
        userCount,
        request: req,
      });
    }

    // Nếu chưa đăng nhập, hiện trang giới thiệu (Landing Page)
    res.render('landing', {
      title: 'Chào mừng | IT Equipment Manager',
      request: req,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { index };
