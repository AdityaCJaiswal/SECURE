import mongoose from 'mongoose';

const trafficDataSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    index: true
  },
  vehicleType: {
    type: String,
    enum: ['car', 'motorcycle', 'truck', 'bus', 'bicycle'],
    default: 'car'
  },
  entryTime: {
    type: Date,
    required: true,
    index: true
  },
  exitTime: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['in', 'out'],
    default: 'in',
    index: true
  },
  visitorName: {
    type: String,
    default: null
  },
  visitorType: {
    type: String,
    enum: ['faculty', 'student', 'worker', 'stranger'],
    default: 'stranger',
    index: true
  },
  cameraLocation: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  imageUrl: {
    type: String,
    default: null
  },
  duration: {
    type: Number, // in minutes
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better query performance
trafficDataSchema.index({ createdAt: -1 });
trafficDataSchema.index({ plateNumber: 1, createdAt: -1 });
trafficDataSchema.index({ visitorType: 1, createdAt: -1 });

// Calculate duration when exitTime is set
trafficDataSchema.pre('save', function(next) {
  if (this.exitTime && this.entryTime) {
    this.duration = Math.round((this.exitTime - this.entryTime) / (1000 * 60)); // minutes
  }
  next();
});

export default mongoose.model('TrafficData', trafficDataSchema);