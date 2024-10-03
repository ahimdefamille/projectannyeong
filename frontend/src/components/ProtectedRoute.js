import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const checkAuth = () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token'); // Remove expired token
          return false;
        }

        return true;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }

    return false;
  };

  return checkAuth() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
