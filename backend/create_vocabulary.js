const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Vocabulary = require('./models/Vocabulary');

// Connect to the database
connectDB();

const lessonId = '66ffba1b2a47f1c677b42a26'; // The lesson ID

const vocabularyData = [
    {
        "lesson_id": lessonId,
        "word_korean": "시",
        "word_romanization": "si",
        "word_english": "hour",
        "example_sentence_korean": "지금은 3시예요.",
        "example_sentence_english": "It is 3 o'clock now."
    }
]
;
  
  // Insert vocabulary data into the database
  Vocabulary.insertMany(vocabularyData)
    .then(() => {
      console.log('Vocabulary added successfully!');
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error adding vocabulary:', err);
    });
  