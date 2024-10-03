import React from 'react';
import { cn } from "../lib/utils";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-105 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;