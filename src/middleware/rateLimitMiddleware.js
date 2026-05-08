const rateLimit = require('express-rate-limit');

/**
 * Rate limit cho login - chặn brute-force
 * Tối đa 10 lần/15 phút mỗi IP
 */
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

/**
 * Rate limit cho register - chặn spam đăng ký
 * Tối đa 5 lần/1 giờ mỗi IP
 */
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

module.exports = { loginLimiter, registerLimiter };
