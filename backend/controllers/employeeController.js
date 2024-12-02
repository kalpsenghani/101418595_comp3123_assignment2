
const Employee = require('../models/employeeModel');

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create employee
const createEmployee = async (req, res) => {
    try {
        const existingEmployee = await Employee.findOne({ email: req.body.email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: employee._id
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get employee by ID
const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({
            message: 'Employee details updated successfully.',
            employee: employee
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee };
