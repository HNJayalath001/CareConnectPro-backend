const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const appointmentRoutes = require('./routes/appoinmentRoute');
const pharmacistRoutes = require('./routes/pharmacistRoute'); // Add pharmacist route

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connection successful!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
})();

// Routes
app.use('/api/users', userRoute);
app.use('/api/admins', adminRoute); // Admin routes
app.use('/api/appointments', appointmentRoutes); // Appointment routes
app.use('/api/pharmacists', pharmacistRoutes); // Pharmacist routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  console.error("Error message:", err.message);
  res.status(500).send({ message: 'Something broke!', error: err.message });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
