const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabularySchema = new Schema({
  lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  word_korean: { type: String, required: true },
  word_romanization: { type: String, required: true }, 
  word_english: { type: String, required: true },
  audio_file_url: { type: String, required: true },
  image_url: { type: String, required: true },
  example_sentence_korean: { type: String, required: true },
  example_sentence_english: { type: String, required: true }
});

module.exports = mongoose.model('Vocabulary', VocabularySchema);
