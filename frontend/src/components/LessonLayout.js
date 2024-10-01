import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import LessonNavbar from './LessonNavbar';
import VocabularyList from './VocabularyList';
import GrammarPage from '../pages/GrammarPage';
import PracticePage from '../pages/PracticePage';
import ExamPage from '../pages/ExamPage';
import { fetchModules } from '../services/api';

const LessonLayout = () => {
  const { moduleNumber } = useParams();
  const [moduleId, setModuleId] = useState(null);

  useEffect(() => {
    const getModuleId = async () => {
      try {
        const modules = await fetchModules();
        const module = modules.find(mod => mod.module_number === parseInt(moduleNumber));
        if (module) setModuleId(module._id);
      } catch (error) {
        console.error('Error fetching moduleId:', error);
      }
    };

    getModuleId();
  }, [moduleNumber]);

  if (!moduleId) return <div>Loading lessons...</div>;

  return (
    <div className="flex h-screen">
      <LessonNavbar 
        moduleNumber={moduleNumber} 
        moduleId={moduleId} 
      />
      <div className="flex-1 overflow-y-auto bg-gradient-to-r from-blue-400 to-purple-500 p-4">
        <Routes>
          <Route 
            path="lessons/:lessonId/vocabulary" 
            element={<VocabularyList />} 
          />
          <Route 
            path="lessons/:lessonId/grammar" 
            element={<GrammarPage />} 
          />
          <Route 
            path="lessons/:lessonId/practice" 
            element={<PracticePage />} 
          />
          <Route 
            path="lessons/:lessonId/exam" 
            element={<ExamPage />} 
          />
        </Routes>
      </div>
    </div>
  );
};

export default LessonLayout;
