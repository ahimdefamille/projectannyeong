const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 100, // Adjusted to allow longer hashed passwords
    },
    completedLessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson', // References the Lesson model
    }],
    isVip: {
        type: Boolean,
        default: false, // Default value, non-VIP by default
    },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('User', UserSchema);
