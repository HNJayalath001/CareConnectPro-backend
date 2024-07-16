const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find the user by email and role
    const user = await userModel.findOne({ email, role });

    // If user not found or role does not match, return error
    if (!user) {
      return res.status(404).send({ message: 'User not found or role does not match', success: false });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isMatch) {
      return res.status(401).send({ message: 'Incorrect password', success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Return success message with token
    res.status(200).send({ message: 'Login successful', success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: 'Error logging in', success: false, error: error.message });
  }
});

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email is already registered
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists', success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided role
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role // Set the role from request body
    });

    // Save the user to the database
    await newUser.save();

    // Return success message
    res.status(201).send({ message: 'User registered successfully', success: true });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send({ message: 'Error registering user', success: false, error: error.message });
  }
});

module.exports = router;
