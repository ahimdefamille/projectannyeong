import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import LessonLayout from './components/LessonLayout';
import Header from './components/Header';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <Header />
      <div className="mt-16 flex">
        {/* Show Navbar only outside of lesson modules */}
        {!location.pathname.startsWith('/learn/module') && <Navbar />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            {/* Handle all lesson-related routes within LessonLayout */}
            <Route path="/learn/module/:moduleNumber/*" element={<LessonLayout />} />
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
