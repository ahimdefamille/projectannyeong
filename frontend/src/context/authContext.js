// authContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Implement login and logout functions to modify isAuthenticated
  const login = (token) => {
    localStorage.setItem('token', token); // Store the token in localStorage
    setIsAuthenticated(true); // Update isAuthenticated state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    setIsAuthenticated(false); // Update isAuthenticated state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
