import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVocabularyByLesson, playPollyAudio } from '../services/api';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const VocabularyList = () => {
  const { lessonId } = useParams();
  const [vocabularies, setVocabularies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation(); // Initialize useTranslation

  useEffect(() => {
    const loadVocabulary = async () => {
      try {
        const fetchedVocabularies = await fetchVocabularyByLesson(lessonId);
        setVocabularies(fetchedVocabularies);
      } catch (error) {
        console.error("Error loading vocabularies:", error);
      }
    };

    loadVocabulary();
  }, [lessonId]);

  const handlePlayAudio = async (word_korean) => {
    await playPollyAudio(word_korean);
  };

  const handlePlayExampleSentence = async (sentence) => {
    await playPollyAudio(sentence);
  };

  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (vocabularies.length === 0) {
    return <p className="text-center mt-8 text-gray-600">{t("No vocabulary found for this lesson.")}</p>;
  }

  const currentWord = vocabularies[currentIndex];

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentIndex + 1}/{vocabularies.length}
          </h1>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-4">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-4xl font-bold text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg flex items-center">
                {currentWord.word_korean}
                <button
                  className="text-indigo-500 hover:text-indigo-600 transition-colors duration-200 ml-2"
                  onClick={() => handlePlayAudio(currentWord.word_korean)}
                  aria-label="Play audio"
                >
                  <Play className="w-6 h-6" />
                </button>
              </h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">[{currentWord.word_romanization}]</p>
            <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  {/* Front side already handled above */}
                </div>
                <div className="flip-card-back">
                  <p className="text-xl text-gray-600">{currentWord.word_english}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-500 mb-2">{t("Example:")}</p>
                    <p
                      className="text-indigo-600 cursor-pointer hover:underline"
                      onClick={() => handlePlayExampleSentence(currentWord.example_sentence_korean)}
                    >
                      {currentWord.example_sentence_korean}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{currentWord.example_sentence_english}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === vocabularies.length - 1}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyList;
