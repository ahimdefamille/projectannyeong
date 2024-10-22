// Import required packages and models
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your MongoDB connection file
const Vocabulary = require('./models/Vocabulary'); // Your Vocabulary model

// Main function to retrieve word_korean values by lesson_id
const getKoreanWordsByLesson = async (lessonId) => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Convert lessonId to ObjectId (if it's a string)
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);

    // Query the Vocabulary collection to find all documents with the given lesson_id
    const vocabularies = await Vocabulary.find({ lesson_id: lessonObjectId });

    if (vocabularies.length === 0) {
      console.log('No vocabularies found for the given lesson_id.');
      return;
    }

    // Extract word_korean values from the query result
    const englishSentences = vocabularies.map((vocab) => vocab.example_sentence_english);

    // Log the results
    console.log('English Sentences:', englishSentences);
    
  } catch (error) {
    console.error('Error retrieving English sentences:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Replace with the lesson_id you want to query
const lessonId = '66ffba1b2a47f1c677b42a24'; // Example lesson_id
getKoreanWordsByLesson(lessonId);
