const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { requireAuth } = require('../middleware/authMiddleware');

// API Routes
router.get('/notifications', requireAuth, apiController.getNotifications);

module.exports = router;
