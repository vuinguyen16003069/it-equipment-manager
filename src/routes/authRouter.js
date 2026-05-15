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
router.get('/verify-otp', authController.getVerifyOtp);
router.post('/verify-otp', authController.postVerifyOtp);

router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.postForgotPassword);
router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);

router.post('/logout', authController.logout);

// Profile & Settings (require authentication)
router.get('/profile', requireAuth, authController.getProfile);
router.post('/profile/avatar', requireAuth, authController.upload.single('avatar'), authController.postUpdateAvatar);
router.post('/profile/change-password', requireAuth, authController.postChangePassword);
router.get('/settings', requireAuth, authController.getSettings);

module.exports = router;
