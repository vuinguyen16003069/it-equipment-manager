const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');

// Chặn brute-force: tối đa 10 lần/15 phút mỗi IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).render('auth/login', {
      title: 'Đăng nhập',
      error: 'Quá nhiều lần thử. Vui lòng thử lại sau 15 phút.',
    });
  },
});

router.get('/login', authController.getLogin);
router.post('/login', loginLimiter, authController.postLogin);
router.post('/logout', authController.logout);

module.exports = router;
