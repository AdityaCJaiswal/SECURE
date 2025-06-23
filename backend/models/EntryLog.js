const mongoose = require('mongoose');

const entryLogSchema = new mongoose.Schema({
  plateNumber: String,
  cameraLocation: String,
  vehicleColor: String,
  vehicleType: String,
  vehicleBrand: String,
  licensePlateColor: String,
  licensePlateType: String,
  imageInfo: String,

  inTime: Date,
  outTime: Date,
  durationMinutes: Number,

  status: { type: String, enum: ['known', 'unknown'], default: 'unknown' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EntryLog', entryLogSchema);
