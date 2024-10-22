// Import required packages and models
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Your MongoDB connection file
const Vocabulary = require('./models/Vocabulary'); // Your Vocabulary model

// Main function to delete vocabularies by lesson_id
const deleteVocabularyByLesson = async (lessonId) => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Convert lessonId to ObjectId (if it's a string)
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);

    // Delete all documents with the given lesson_id
    const result = await Vocabulary.deleteMany({ lesson_id: lessonObjectId });

    if (result.deletedCount === 0) {
      console.log('No vocabularies found to delete for the given lesson_id.');
    } else {
      console.log(`${result.deletedCount} vocabularies deleted for lesson_id: ${lessonId}`);
    }
    
  } catch (error) {
    console.error('Error deleting words:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Replace with the lesson_id you want to delete
const lessonId = '66ffba1b2a47f1c677b42a24'; // Example lesson_id
deleteVocabularyByLesson(lessonId);
