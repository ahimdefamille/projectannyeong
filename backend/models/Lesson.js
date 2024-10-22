// backend/models/Lesson.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new mongoose.Schema({
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  lesson_number: { type: Number, required: true },
  title: { type: String, required: true },
  subitems: [{ type: String }],
  vocabularies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }],
  isVipExclusive: {
    type: Boolean,
    default: false, // Default value, not VIP exclusive
},
}, { strictPopulate: false }); // This will allow undefined paths to be populated


module.exports = mongoose.model('Lesson', lessonSchema);
