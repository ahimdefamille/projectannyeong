// createLessons.js
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Lesson = require('./models/Lesson');

const moduleId = '66ffb60710df13705ca328ee'; // Module ID for the lessons

// Function to create 15 lessons
const createLessons = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Create an array of lesson data
    const lessons = Array.from({ length: 15 }, (v, i) => ({
      module: moduleId,
      lesson_number: i + 1,
      title: `Lesson ${i + 1}`,
      subitems: ['Vocabulary', 'Grammar', 'Practice', 'Exam'], // Fixed subitems
      vocabularies: [], // Populate as needed
      isVipExclusive: false, // Always false
    }));

    // Insert the lessons into the database
    await Lesson.insertMany(lessons);
    console.log('15 lessons created successfully!');

  } catch (error) {
    console.error('Error creating lessons:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Run the function
createLessons();
