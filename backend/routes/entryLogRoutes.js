const express = require('express');
const router = express.Router();
const EntryLog = require('../models/EntryLog');
const { authenticate } = require('../middleware/authMiddleware');

// GET /api/logs
router.get('/', authenticate, async (req, res) => {
  const logs = await EntryLog.find().sort({ createdAt: -1 });
  res.json(logs);
});

// GET /api/logs/:plateNumber
router.get('/:plateNumber', authenticate, async (req, res) => {
  const logs = await EntryLog.find({ plateNumber: req.params.plateNumber });
  res.json(logs);
});

module.exports = router;
