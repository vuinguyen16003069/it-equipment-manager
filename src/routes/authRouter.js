const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimitMiddleware');
const { requireAuth } = require('../middleware/authMiddleware');

// Auth Routes
router.get('/login', authController.getLogin);
router.post('/login', loginLimiter, authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', registerLimiter, authController.postRegister);
router.post('/logout', authController.logout);

// Profile & Settings (require authentication)
router.get('/profile', requireAuth, authController.getProfile);
router.post('/profile/change-password', requireAuth, authController.postChangePassword);
router.get('/settings', requireAuth, authController.getSettings);

module.exports = router;
