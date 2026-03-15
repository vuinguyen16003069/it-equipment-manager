const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const { requireAuth } = require('../middleware/authMiddleware');

const STATUS_LABEL = {
  available: 'Có sẵn',
  'in-use': 'Đang dùng',
  maintenance: 'Bảo trì',
  retired: 'Thanh lý',
};

router.get('/notifications', requireAuth, async (_req, res) => {
  try {
    // System notifications
    const systemNotifs = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .select('title subtitle isNew createdAt');
    const systemMapped = systemNotifs.map((n) => ({
      id: n._id,
      title: n.title,
      subtitle: n.subtitle,
      time: n.createdAt,
      isNew: n.isNew,
    }));

    // Equipment notifications
    const recent = await Equipment.find({})
      .sort({ updatedAt: -1 })
      .limit(4)
      .select('name type status updatedAt createdAt');
    const equipmentMapped = recent.map((item) => {
      const isNew = Date.now() - new Date(item.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
      return {
        id: item._id,
        title: item.name,
        subtitle: `${item.type} · ${STATUS_LABEL[item.status] || item.status}`,
        time: item.updatedAt,
        isNew,
      };
    });

    // Merge, sort by time, take top 8
    const notifications = [...systemMapped, ...equipmentMapped]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 8);

    res.json({ notifications });
  } catch {
    res.json({ notifications: [] });
  }
});

module.exports = router;
