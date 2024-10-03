const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
          // Get token from header
          token = req.headers.authorization.split(' ')[1];

          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          // Attach user to request object (excluding password)
          req.user = await User.findById(decoded.userId).select('-password'); // Make sure the key matches the token

          if (!req.user) {
              return res.status(401).json({ message: 'Not authorized, user not found' });
          }

          return next();
      } catch (error) {
          console.error('Not authorized, token failed');
          return res.status(401).json({ message: 'Not authorized, token failed' });
      }
  }

  if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
