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
      success: null,
    });
  },
});

// Chặn brute-force đăng ký: tối đa 5 lần/1 giờ mỗi IP
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).render('auth/register', {
      title: 'Đăng ký',
      error: 'Quá nhiều lần đăng ký. Vui lòng thử lại sau 1 giờ.',
      success: null,
    });
  },
});

router.get('/login', authController.getLogin);
router.post('/login', loginLimiter, authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', registerLimiter, authController.postRegister);
router.post('/logout', authController.logout);

const { requireAuth } = require('../middleware/authMiddleware');
router.get('/profile', requireAuth, authController.getProfile);
router.post('/profile/change-password', requireAuth, authController.postChangePassword);
router.get('/settings', requireAuth, authController.getSettings);

module.exports = router;
