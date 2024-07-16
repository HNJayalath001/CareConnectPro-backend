const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'pharmacist', 'owner'],
    default: 'user'
  }
}, {
  timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
