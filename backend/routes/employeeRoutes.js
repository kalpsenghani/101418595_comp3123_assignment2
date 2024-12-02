const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel'); // Ensure this model has the right fields

// POST /employees
router.post('/employees', async (req, res) => {
  const { firstName, lastName, details } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !details) {
    return res.status(400).json({ message: 'All fields (firstName, lastName, details) are required' });
  }

  try {
    const employee = new Employee({ firstName, lastName, details });
    await employee.save();
    res.status(201).json({ message: 'Employee added', employee });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /employees/:id
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /employees/:id
router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, details } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !details) {
    return res.status(400).json({ message: 'All fields (firstName, lastName, details) are required' });
  }

  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id, 
      { firstName, lastName, details }, 
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /employees/:id
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
