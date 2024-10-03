// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/Users');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username is taken, please use another one.' });
        }

        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email is already registered. Login instead?' });
        }

        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        });
        console.log('Creating user:', user);

        await user.save();
        console.log('User saved successfully:', user);

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error('Error in signup:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token and user information
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                completedLessons: user.completedLessons,
                isVip: user.isVip,
                // Add any other user properties you want to return
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};
