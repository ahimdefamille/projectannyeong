// backend/models/Exam.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  korean_sentence: { type: String, required: true },
  english_sentence: { type: String, required: true },
});

module.exports = mongoose.model('Exam', ExamSchema);
