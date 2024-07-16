const mongoose = require('mongoose');

const pharmacistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const PharmacistModel = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = PharmacistModel;
