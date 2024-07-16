const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
  },
  bloodPressure: {
    type: Boolean,
    default: false
  },
  cholesterol: {
    type: Boolean,
    default: false
  },
  sugar: {
    type: Boolean,
    default: false
  },
  heartProblems: {
    type: Boolean,
    default: false
  },
  previousMedicine: {
    type: Boolean,
    default: false
  },
  dateTime: {
    type: Date,
    required: true
  },
  sickDescription: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true,
    enum: ['Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic Surgeon', 'ENT']
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
