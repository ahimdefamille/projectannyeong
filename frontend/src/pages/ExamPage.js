import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchExamsByLesson, playPollyAudio } from '../services/api';
import Progress from '../components/Progress';
import Fireworks from '../components/Fireworks';
import { Eye, EyeOff } from 'lucide-react';


const ExamPage = () => {
    const { lessonId } = useParams();
    const [exams, setExams] = useState([]);
    const [currentExamIndex, setCurrentExamIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalCount] = useState(30); // Fixed total count of 30 questions
    const [showCongrats, setShowCongrats] = useState(false);
    const [isGameComplete, setIsGameComplete] = useState(false);

    const prepareExams = useCallback((data) => {
        const shuffledExams = shuffleArray(data);
        const extendedExams = [];

        shuffledExams.forEach((exam) => {
            extendedExams.push({ ...exam, direction: 'toEnglish' });
            extendedExams.push({ ...exam, direction: 'toKorean' });
        });

        return shuffleArray(extendedExams).slice(0, 30);
    }, []);

    useEffect(() => {
        const loadExams = async () => {
            try {
                const data = await fetchExamsByLesson(lessonId);
                setExams(prepareExams(data));
            } catch (error) {
                console.error("Error loading exams:", error);
            }
        };

        loadExams();
    }, [lessonId, prepareExams]);

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    // Levenshtein distance algorithm
    const levenshteinDistance = (a, b) => {
        const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b[i - 1] === a[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    };

    // Similarity percentage calculation
    const similarity = (input, answer) => {
        const distance = levenshteinDistance(input, answer);
        const maxLength = Math.max(input.length, answer.length);
        return ((maxLength - distance) / maxLength) * 100;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentExam = exams[currentExamIndex];
        if (!currentExam) return;

        const isKoreanToEnglish = currentExam.direction === 'toEnglish';
        const correctAnswer = isKoreanToEnglish ? currentExam.english_sentence : currentExam.korean_sentence;

        // Calculate similarity between user input and the correct answer
        const similarityScore = similarity(userInput.trim().toLowerCase(), correctAnswer.toLowerCase());

        if (similarityScore >= 80) {
            setFeedback("Correct! Great job!");
            setCorrectCount(correctCount + 1);
            setShowNext(true);

            if (correctCount + 1 === totalCount) {
                setIsGameComplete(true);
                setShowCongrats(true);
            }
        } else {
            setFeedback('Incorrect! Please try again.');
            setShowNext(false);
        }
    };

    const goToNextQuestion = (e) => {
        e.preventDefault();
        // Move to the next question, wrapping around to the start if at the end
        setCurrentExamIndex((currentExamIndex + 1) % exams.length);
        setShowNext(false);
        setUserInput('');
        setFeedback(''); // Reset feedback to clear "Incorrect" message
        setShowAnswer(false); // Reset showAnswer to hide the hint for the next question
    };

    const restartGame = () => {
        setCurrentExamIndex(0);
        setCorrectCount(0);
        setIsGameComplete(false);
        setShowCongrats(false);
        setUserInput('');
        setFeedback('');
    };

    const handleHintToggle = () => setShowAnswer(!showAnswer);

    const handlePlayAudio = async (korean_sentence) => {
        await playPollyAudio(korean_sentence);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            {showCongrats && <Fireworks />}
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                <div className="mb-6 flex flex-col items-center">
                    <Progress value={(correctCount / totalCount) * 100} />
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Progress: {correctCount}/{totalCount}
                    </p>
                </div>
                {isGameComplete ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Congratulations!</h2>
                        <p className="text-gray-600 mb-4">You've completed the exam!</p>
                        <button 
                            onClick={restartGame}
                            className="mt-4 w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
                        >
                            One more round?
                        </button>
                    </div>
                ) : (
                    <>
                        {exams[currentExamIndex] && (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                                    {exams[currentExamIndex]?.direction === 'toEnglish' ? 
                                        'Translate this to English:' : 'Translate this to Korean:'}
                                </h2>
                                <div className="text-3xl font-semibold mb-6 text-center text-blue-600">
                                    {exams[currentExamIndex]?.direction === 'toEnglish' ? (
                                        <>
                                            <span 
                                                onClick={() => handlePlayAudio(exams[currentExamIndex].korean_sentence)}
                                                className="cursor-pointer hover:text-blue-800 transition duration-300"
                                                title="Click to hear pronunciation"
                                            >
                                                {exams[currentExamIndex].korean_sentence}
                                            </span>
                                        </>
                                    ) : (
                                        exams[currentExamIndex].english_sentence
                                    )}
                                </div>
                            </>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Your answer"
                                className="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {showNext ? (
                                <button 
                                    onClick={goToNextQuestion} 
                                    className="mt-4 w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
                                >
                                    Next
                                </button>
                            ) : (
                                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
                                    Submit
                                </button>
                            )}
                        </form>
                        <button onClick={handleHintToggle} className="mt-4 text-blue-600 flex items-center justify-center w-full">
                            {showAnswer ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />} 
                            {showAnswer ? 'Hide Hint' : 'Show Hint'}
                        </button>
                        {showAnswer && (
                            <p className="mt-2 text-center text-gray-600">
                                {exams[currentExamIndex]?.direction === 'toEnglish' ? 
                                    `Hint: ${exams[currentExamIndex].english_sentence}` : 
                                    `Hint: ${exams[currentExamIndex].korean_sentence}`}
                            </p>
                        )}
                        {feedback && (
                            <p className={`mt-4 text-center font-semibold ${feedback.includes('Incorrect') ? 'text-red-500' : 'text-green-500'}`}>
                                {feedback}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ExamPage;
