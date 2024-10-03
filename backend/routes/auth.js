// routes/auth.js
const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Signup Route
router.post(
    '/signup',
    [
        check('username', 'Username must be at least 8 characters').isLength({ min: 8 }), 
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be between 8 and 16 characters').isLength({ min: 8, max: 16 }),
    ],
    authController.signup // Ensure this is correctly imported
);

// Login Route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    authController.login // Ensure this is correctly imported
);

module.exports = router;
