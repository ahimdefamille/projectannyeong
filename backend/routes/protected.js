// routes/protected.js
const express = require('express');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;
