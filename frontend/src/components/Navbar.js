import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, PenTool } from 'lucide-react';

function Navbar() {
  const navItems = [
    { name: 'Home', icon: <Home className="h-5 w-5" />, path: '/' },
    { name: 'Hangeul', icon: <PenTool className="h-5 w-5" />, path: '/hangeul' },
    { name: 'Learn', icon: <BookOpen className="h-5 w-5" />, path: '/learn' },
  ];

  return (
    <nav className="w-64 p-4 flex flex-col items-start h-screen bg-gray-200 shadow-md">
      <ul className="flex flex-col space-y-0 p-0 w-full">
        {navItems.map((item, index) => (
          <li key={index} className="w-full">
            <Link
              to={item.path}
              className="flex items-center space-x-3 text-gray-700 p-4 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition w-full"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
