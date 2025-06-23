// routes/anprRoutes.js
const express = require('express');
const router = express.Router();
const EntryLog = require('../models/EntryLog');
const Vehicle = require('../models/Vehicle');

router.post('/callback', async (req, res) => {
  try {
    const {
      plateNumber,
      cameraLocation,
      vehicleColor,
      vehicleType,
      vehicleBrand,
      licensePlateColor,
      licensePlateType,
      imageInfo
    } = req.body;


    const vehicle = await Vehicle.findOne({ plateNumber });
    const status = vehicle ? "known" : "unknown";

    // Check last log for this vehicle
    // Inside POST /callback
const lastLog = await EntryLog.findOne({ plateNumber }).sort({ createdAt: -1 });

const MIN_DELAY_MS = 5 * 60 * 1000; // 5 minutes
const now = new Date();

if (!lastLog || (lastLog.outTime && now - lastLog.outTime > MIN_DELAY_MS)) {
    // Log new IN


      // FIRST appearance or already logged out: mark as IN
      const newLog = new EntryLog({
        plateNumber,
        cameraLocation,
        vehicleColor,
        vehicleType,
        vehicleBrand,
        licensePlateColor,
        licensePlateType,
        imageInfo,
        inTime: now,
        status
      });
      await newLog.save();
      res.status(201).json({ message: 'Logged as entry (IN)' });
    } else {
      // Second appearance (OUT): mark outTime and duration
      lastLog.outTime = now;
      lastLog.durationMinutes = Math.round((now - lastLog.inTime) / 60000); // in minutes
      await lastLog.save();
      res.status(200).json({ message: 'Logged as exit (OUT)' });
    }
  } catch (err) {
    console.error("ANPR logging failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
