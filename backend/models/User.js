const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // System-level role: who can do what in the app
  role: {
    type: String,
    enum: ['admin', 'guard', 'user'],
    default: 'user'
  },

  // University-level user type: for vehicle context
  userType: {
    type: String,
    enum: ['student', 'faculty', 'non-teaching'],
    default: 'student' // or make it required if needed
  }
});

module.exports = mongoose.model('User', userSchema);
