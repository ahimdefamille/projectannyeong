import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import LessonLayout from './components/LessonLayout';
import Header from './components/Header';
import Index from './pages/Index';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      {location.pathname !== '/' && <Header />}
      
      <div className={`${location.pathname === '/' ? '' : 'mt-16'} flex`}>
        {!location.pathname.startsWith('/learn/module') && location.pathname !== '/' && <Navbar />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learn" 
              element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learn/module/:moduleNumber/*" 
              element={
                <ProtectedRoute>
                  <LessonLayout />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp;
