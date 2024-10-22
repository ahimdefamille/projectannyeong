const mongoose = require('mongoose'); // Import mongoose
const connectDB = require('./config/db'); // Import the connectDB function
const Exam = require('./models/Exam'); // Adjust path as necessary

const LESSON_ID = "66ffba1b2a47f1c677b42a26"; // Store the lesson ID as a constant

// Connect to MongoDB
const run = async () => {
    await connectDB(); // Establish connection

    // List of exams data
    const sampleExams = [
        {
            "lesson": LESSON_ID,
            "korean_sentence": "무슨 요일입니까?",
            "english_sentence": "What day (of the week) is it?"
        },
        {
            "lesson": LESSON_ID,
            "korean_sentence": "며칠입니까?",
            "english_sentence": "What date is it?"
        },
        {
            "lesson": LESSON_ID,
            "korean_sentence": "전화번호가 뭐입니까?",
            "english_sentence": "What is your phone number?"
        },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "프로그래머는 언제 사무실에 갑니까?",
                "english_sentence": "When does the programmer go to the office?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "연구원은 언제 박물관에서 일합니까?",
                "english_sentence": "When does the researcher work at the museum?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "건축가는 언제 도서관에서 책을 읽습니까?",
                "english_sentence": "When does the architect read books at the library?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "기자는 언제 극장에서 영화를 봅니까?",
                "english_sentence": "When does the journalist watch a movie at the theater?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "요리사는 언제 식당에서 일합니까?",
                "english_sentence": "When does the chef work at the restaurant?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "상담사는 언제 공원에서 걷습니까?",
                "english_sentence": "When does the counselor walk in the park?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "약사는 언제 약국에서 일합니까?",
                "english_sentence": "When does the pharmacist work at the pharmacy?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "물리치료사는 언제 체육관에서 운동합니까?",
                "english_sentence": "When does the physical therapist exercise at the gym?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "간호사는 언제 병원에서 환자를 만납니까?",
                "english_sentence": "When does the nurse meet patients at the hospital?"
            },
            {
                "lesson": LESSON_ID,
                "korean_sentence": "회계사는 언제 사무실에서 일합니까?",
                "english_sentence": "When does the accountant work in the office?"
            }        ,
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공일공-일이삼사-오육칠팔입니다.",
                    "english_sentence": "My phone number is 010-1234-5678."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공일이-삼사오육-칠팔구십입니다.",
                    "english_sentence": "My phone number is 012-345-6789."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공이삼-사오육칠-팔구십입니다.",
                    "english_sentence": "My phone number is 023-456-7890."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공사공-일이삼칠-팔구구십입니다.",
                    "english_sentence": "My phone number is 040-123-7890."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공오칠-일이삼사-육팔구십입니다.",
                    "english_sentence": "My phone number is 057-123-4567."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공육팔-삼오이칠-일공구십입니다.",
                    "english_sentence": "My phone number is 068-352-7109."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공칠일-이삼사오-육칠팔구입니다.",
                    "english_sentence": "My phone number is 071-234-5678."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공팔구-일이삼사-오육칠팔입니다.",
                    "english_sentence": "My phone number is 089-123-4567."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공구공-삼이팔칠-오일십입니다.",
                    "english_sentence": "My phone number is 090-328-7510."
                },
                {
                    "lesson": LESSON_ID,
                    "korean_sentence": "제 전화번호는 공이사-일육구팔-삼오이십입니다.",
                    "english_sentence": "My phone number is 024-169-3502."
                }
            ]            
    ;

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
