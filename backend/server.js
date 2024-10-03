// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes); // General API routes
app.use('/api/auth', authRoutes); // Authentication routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Sample Route
app.get('/', (req, res) => {
    res.send('Project Annyeong backend is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
