const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModels");
const jwt = require("jsonwebtoken");

// Admin login route
router.post("/login", async (req, res) => {
  try {
    // Find the admin by email
    const admin = await adminModel.findOne({ email: req.body.email });

    // If admin not found, return error
    if (!admin) {
      return res.status(404).send({ message: "Admin not found", success: false });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    
    // If passwords don't match, return error
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return success message with token
    res.status(200).send({ message: "Login successful", success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in", success: false });
  }
});

// Admin registration route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send({ message: "Email already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword
    });

    // Save the admin to the database
    await newAdmin.save();

    // Return success message
    res.status(201).send({ message: "Admin registered successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error registering admin", success: false });
  }
});

module.exports = router;
