const express = require('express');
const PharmacistModel = require('../models/pharmacistModel');

const router = express.Router();

// Create a new pharmacist
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPharmacist = new PharmacistModel({ name, description });
    await newPharmacist.save();
    res.status(201).json(newPharmacist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all pharmacists
router.get('/', async (req, res) => {
  try {
    const pharmacists = await PharmacistModel.find({});
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a specific pharmacist by ID
router.get('/:id', async (req, res) => {
  try {
    const pharmacist = await PharmacistModel.findById(req.params.id);
    if (!pharmacist) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific pharmacist by ID
router.patch('/:id', async (req, res) => {
  try {
    const pharmacist = await PharmacistModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pharmacist) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a specific pharmacist by ID
router.delete('/:id', async (req, res) => {
  try {
    const pharmacist = await PharmacistModel.findByIdAndDelete(req.params.id);
    if (!pharmacist) {
      return res.status(404).json({ error: 'Pharmacist not found' });
    }
    res.status(200).json({ message: 'Pharmacist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
