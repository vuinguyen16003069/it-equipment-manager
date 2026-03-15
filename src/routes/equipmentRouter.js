const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', requireAuth, equipmentController.index);
router.get('/create', requireAdmin, equipmentController.getCreate);
router.post('/create', requireAdmin, equipmentController.postCreate);
router.get('/edit/:id', requireAdmin, equipmentController.getEdit);
router.post('/edit/:id', requireAdmin, equipmentController.postEdit);
router.post('/delete/:id', requireAdmin, equipmentController.deleteEquipment);

module.exports = router;
