// app.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./config/db'); // This is the MongoDB connection file
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const employeeRoutes = require('./routes/employeeRoutes'); // Import employee routes

const app = express();
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});

// Middleware
app.use(bodyParser.json()); // To parse JSON request bodies

// Routes
app.use('/api/users', userRoutes); // User related routes (signup, login)
app.use('/api', employeeRoutes); // Employee related routes (CRUD operations)

app.use((req, res, next) => {
  res.status(404).json({
      message: 'Endpoint not found',
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
      message: 'Something went wrong!',
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
