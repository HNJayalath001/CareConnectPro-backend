const express = require('express');
const Appointment = require('../models/appoinmentModel'); // Adjust the path as needed

const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve a specific appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send();
    }
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a specific appointment by ID
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name', 'age', 'phoneNumber', 'gender', 'bloodType', 'bloodPressure', 
    'cholesterol', 'sugar', 'heartProblems', 'previousMedicine', 'dateTime', 
    'sickDescription', 'specialization'
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      appointment[update] = req.body[update];
    });
    await appointment.save();

    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a specific appointment by ID
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).send();
    }
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
