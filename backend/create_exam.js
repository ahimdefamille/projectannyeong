const mongoose = require('mongoose'); // Import mongoose
const connectDB = require('./config/db'); // Import the connectDB function
const Exam = require('./models/Exam'); // Adjust path as necessary

// Connect to MongoDB
const run = async () => {
    await connectDB(); // Establish connection

    // Sample exams data
    const sampleExams = [
        {
            lesson: "66f3eb52018c22f55d4c2bd1",
            korean_sentence: "이것은 사과입니다.",
            english_sentence: "This is an apple."
        },
        {
            lesson: "66f3eb52018c22f55d4c2bd1",
            korean_sentence: "학생들은 도서관에 있습니다.",
            english_sentence: "The students are in the library."
        },
        {
            lesson: "66f3eb52018c22f55d4c2bd1",
            korean_sentence: "안녕하세요, 반갑습니다.",
            english_sentence: "Hello, nice to meet you."
        }
    ];

    // Insert sample exams into the database
    try {
        await Exam.insertMany(sampleExams);
        console.log('Sample exams inserted');
    } catch (err) {
        console.error('Error inserting sample exams:', err);
    } finally {
        mongoose.connection.close(); // Close connection after the operation
    }
};

run(); // Call the async function to execute
