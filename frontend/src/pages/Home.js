import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Headphones, Mic, Award } from 'lucide-react';

const Home = () => {
    const features = [
      { name: 'Vocabulary', icon: <BookOpen className="h-6 w-6" />, path: '/vocabulary' },
      { name: 'Grammar', icon: <MessageSquare className="h-6 w-6" />, path: '/grammar' },
      { name: 'Exam', icon: <Headphones className="h-6 w-6" />, path: '/exam' },
      { name: 'Playground', icon: <Mic className="h-6 w-6" />, path: '/playground' },
      { name: 'Community', icon: <Award className="h-6 w-6" />, path: '/community' },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <main className="container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-6">Welcome to Annyeong!</h2>
          <p className="mb-8">Start your Korean learning journey with our interactive lessons and exercises.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.path} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3">{feature.name}</h3>
                </div>
                <p className="text-gray-600">Practice and improve your {feature.name.toLowerCase()} skills.</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    );
  };
  
  export default Home;
  