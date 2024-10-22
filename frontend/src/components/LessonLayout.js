import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import LessonNavbar from './LessonNavbar';
import VocabularyList from './VocabularyList';
import GrammarPage from '../pages/GrammarPage';
import PracticePage from '../pages/PracticePage';
import ExamPage from '../pages/ExamPage';
import { fetchModules } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const LessonLayout = () => {
  const { moduleNumber } = useParams();
  const [moduleId, setModuleId] = useState(null);
  const [isVip, setIsVip] = useState(false);
  const [module, setModule] = useState(null); // Add state to hold module data

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsVip(decoded.isVip || false);
      console.log("Decoded VIP status:", decoded.isVip);
    }

    const getModuleId = async () => {
      try {
        const modules = await fetchModules();
        const foundModule = modules.find(mod => mod.module_number === parseInt(moduleNumber));
        if (foundModule) {
          setModuleId(foundModule._id);
          setModule(foundModule); // Store the module data in state
          console.log("Module VIP status:", foundModule.isVipExclusive);
        }
      } catch (error) {
        console.error('Error fetching moduleId:', error);
      }
    };

    getModuleId();
  }, [moduleNumber]);

  if (!moduleId) return <div>Loading lessons...</div>; // Wait until module ID is available

  // Check if the module is VIP-exclusive and user is not VIP
  if (module && module.isVipExclusive && !isVip) {
    return <Navigate to="/learn" />;
  }

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
