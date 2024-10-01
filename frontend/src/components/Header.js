import React from 'react';
import { Link } from 'react-router-dom';
import i18n from 'i18next';

const Header = () => {
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header className="bg-gray-900 shadow-lg py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <Link 
        to="/" 
        className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-105"
      >
        <span className="text-blue-500">Project</span> Annyeong
      </Link>
      <div className="flex items-center">
        <label htmlFor="language-select" className="text-white mr-2">Language:</label>
        <div className="relative">
          <select 
            id="language-select" 
            onChange={handleLanguageChange} 
            className="bg-blue-600 text-white px-3 py-2 rounded-md appearance-none"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
