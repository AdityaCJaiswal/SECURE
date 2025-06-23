// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { authenticate } = require('../middleware/authMiddleware');

// POST /api/vehicles/register
router.post('/register', authenticate, async (req, res) => {
  try {
    const { plateNumber, ownerName, role } = req.body;

    const existing = await Vehicle.findOne({ plateNumber });
    if (existing) return res.status(409).json({ message: "Vehicle already exists" });

    const vehicle = new Vehicle({
      plateNumber,
      ownerName,
      role,
      registeredBy: req.user.id
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    console.error("Vehicle registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/vehicles
router.get('/', authenticate, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

module.exports = router;
