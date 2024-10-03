import React, { useState } from 'react';
import { BookOpen, MessageSquare, PenTool, Award, FileText } from 'lucide-react';
import Button from "../components/Button";
import Background from "../components/Background";
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';

const Index = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const features = [
    { name: 'Vocabulary', icon: <BookOpen className="h-6 w-6" />, description: 'Build your Korean word bank' },
    { name: 'Grammar', icon: <MessageSquare className="h-6 w-6" />, description: 'Master Korean sentence structures' },
    { name: 'Practice', icon: <PenTool className="h-6 w-6" />, description: 'Reinforce your skills with exercises' },
    { name: 'Quizzes', icon: <Award className="h-6 w-6" />, description: 'Test your knowledge and progress' },
    { name: 'TOPIK Prep', icon: <FileText className="h-6 w-6" />, description: 'Prepare for the official Korean test' },
  ];

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowLogin = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      <Background />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center bg-black bg-opacity-50 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold mb-4 text-pink-600 drop-shadow-lg">
          Project Annyeong
        </h1>
        <p className="text-xl mb-8 max-w-lg">
          Embark on a fun-filled journey to master the Korean language
        </p>
        <Button size="lg" className="px-10 py-5 text-2xl" onClick={scrollToFeatures}>
          Begin Your Adventure
        </Button>
      </section>

      {/* Features Section */}
      <section id="features" className="flex flex-col items-center justify-center py-10">
        <h3 className="text-4xl font-bold mb-8 text-center">Your Korean Learning Toolkit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h4 className="text-xl font-semibold ml-3">{feature.name}</h4>
              </div>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign Up and Sign In Buttons */}
      <section className="flex flex-col items-center justify-center py-8">
        <div className="flex space-x-4">
          <Button 
            size="md" 
            className="px-8 py-4 text-xl bg-pink-600 hover:bg-pink-700 transition duration-300" 
            onClick={() => { setShowSignupForm(true); setShowLoginForm(false); }}
          >
            Sign Up
          </Button>
          <Button 
            size="md" 
            className="px-8 py-4 text-xl bg-pink-600 hover:bg-pink-700 transition duration-300" 
            onClick={handleShowLogin}
          >
            Sign In
          </Button>
        </div>

        {/* Transition effect for forms */}
        <div className="mt-4">
          {showLoginForm && (
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <LoginForm />
            </div>
          )}
          {showSignupForm && (
            <div className="transition-opacity duration-500 ease-in-out opacity-100">
              <SignupForm onShowLogin={handleShowLogin} /> {/* Pass the function here */}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-30 py-8">
        <div className="container mx-auto px-4">
          <div className="mt-4 text-center">
            <p>&copy; 2024 Annyeong. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
