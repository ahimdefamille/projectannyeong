// src/components/Footer.js

import React from 'react';

const Footer = ({ onComplete }) => {
  return (
    <div className="flex justify-center items-center h-16 bg-blue-50 border-t">
      <button 
        onClick={onComplete} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Complete
      </button>
    </div>
  );
};

export default Footer;
