import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVocabularyByLesson, playPollyAudio } from '../services/api';
import Progress from '../components/Progress';
import { Eye, EyeOff } from 'lucide-react';
import Fireworks from '../components/Fireworks';

const PracticePage = () => {
    const { lessonId } = useParams();
    const [vocabularies, setVocabularies] = useState([]);
    const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [showCongrats, setShowCongrats] = useState(false);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [previousIndex, setPreviousIndex] = useState(null);
    const [isNextTriggered, setIsNextTriggered] = useState(false); 

    const feedbackMessages = [
        "Great job!",
        "Well done!",
        "Awesome!",
        "You're doing great!",
        "Keep it up!"
    ];

    const loadVocabulary = useCallback(async () => {
        try {
            const data = await fetchVocabularyByLesson(lessonId);
            const uniqueVocab = [...new Set(data.map(v => JSON.stringify(v)))].map(v => JSON.parse(v));
            const limitedVocab = uniqueVocab.slice(0, Math.min(5, uniqueVocab.length));
            const formattedVocab = limitedVocab.flatMap(v => [
                { ...v, direction: 'toEnglish' }, 
                { ...v, direction: 'toKorean' }
            ]);
            const extendedVocab = shuffleArray(formattedVocab);
            setVocabularies(extendedVocab);
            setTotalCount(5); 
        } catch (error) {
            console.error("Error loading vocabulary:", error);
        }
    }, [lessonId]);

    useEffect(() => {
        loadVocabulary();
    }, [loadVocabulary]);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNextTriggered) {
            setIsNextTriggered(false);
            return;
        }

        const currentVocab = vocabularies[currentVocabIndex];
        if (!currentVocab) return;

        const isKoreanToEnglish = currentVocab.direction === 'toEnglish';

        if (userInput.trim().toLowerCase() === (isKoreanToEnglish ? currentVocab.word_english.toLowerCase() : currentVocab.word_korean.toLowerCase())) {
            setFeedback(feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]);
            setCorrectCount(correctCount + 1);
            setShowNext(true);
            setShowAnswer(false);

            if (correctCount + 1 === totalCount) {
                setIsGameComplete(true);
                setShowCongrats(true);
            }
        } else {
            setFeedback('Incorrect! Please try again.');
            setShowNext(false);
        }
    };

    const handleHintToggle = () => {
        setShowAnswer(!showAnswer);
    };

    const restartGame = () => {
        setCurrentVocabIndex(0);
        setCorrectCount(0);
        setIsGameComplete(false);
        setShowCongrats(false);
        setUserInput('');
        setFeedback('');
        setShowNext(false);
        loadVocabulary();
    };

    const goToNextQuestion = () => {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * vocabularies.length);
        } while (nextIndex === currentVocabIndex || nextIndex === previousIndex);
        setPreviousIndex(currentVocabIndex);
        setCurrentVocabIndex(nextIndex);
        setShowNext(false);
        setUserInput('');
        setShowAnswer(false);
        setFeedback('');
        setIsNextTriggered(true);
    };

    const handlePlayAudio = async (word_korean) => {
        await playPollyAudio(word_korean);
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
                        <p className="text-gray-600 mb-4">You've completed the game!</p>
                        <button 
                            onClick={restartGame}
                            className="mt-4 w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
                        >
                            One more round?
                        </button>
                    </div>
                ) : (
                    <>
                        {vocabularies[currentVocabIndex] && (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                                    {vocabularies[currentVocabIndex]?.direction === 'toEnglish' ? 'What does this mean in English?' : 'What does this mean in Korean?'}
                                </h2>
                                <div 
                                    className="text-3xl font-semibold mb-6 text-center text-blue-600 cursor-pointer hover:text-blue-800 transition duration-300"
                                    onClick={() => handlePlayAudio(vocabularies[currentVocabIndex]?.word_korean)} // Make it clickable
                                    title="Click to hear pronunciation"
                                >
                                    {vocabularies[currentVocabIndex]?.direction === 'toEnglish' ? vocabularies[currentVocabIndex].word_korean : vocabularies[currentVocabIndex].word_english}
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
                                {vocabularies[currentVocabIndex]?.direction === 'toEnglish' ? 
                                    `Hint: ${vocabularies[currentVocabIndex].word_english}` 
                                    : `Hint: ${vocabularies[currentVocabIndex].word_korean}`}
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

export default PracticePage;
