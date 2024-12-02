const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully.', user_id: user._id });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ status: false, message: 'Invalid Username and password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.status(200).json({ message: 'Login successful.', jwt_token: token });
};