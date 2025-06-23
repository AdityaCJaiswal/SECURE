import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['faculty', 'student', 'worker'],
    required: true
  },
  department: {
    type: String,
    default: null
  },
  contactNumber: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: null
  },
  totalVisits: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Visitor', visitorSchema);