const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// All user management routes require admin role
router.use(requireAdmin);

router.get('/', userController.index);
router.get('/:id/edit', userController.getEdit);
router.post('/:id/role', userController.postUpdateRole);
router.post('/:id/reset-password', userController.postResetPassword);
router.post('/:id/delete', userController.postDelete);

module.exports = router;
