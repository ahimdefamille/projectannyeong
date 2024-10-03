import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Import loginUser function from your API services
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/authContext'; // Import useAuth to access authentication context

const LoginForm = () => {
  const { login } = useAuth(); // Get the login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the loginUser function from your API service
      const data = await loginUser(email, password);
      console.log("Data received after login:", data);
      if (data.token) {
        localStorage.setItem('token', data.token); // Store the token in localStorage
        setError(null);
        
        login(data.token); // Pass the token to the login function
        navigate('/home');
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Check if the user is already logged in based on the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token
        console.log("Decoded token: ",decoded)
        const currentTime = Date.now() / 1000; // Get the current time in seconds

        if (decoded.exp < currentTime) {
          localStorage.removeItem('token'); // If token has expired, remove it
          console.log('Token expired. Please login again.');
        } else {
          navigate('/home'); // If token is valid, redirect to home
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-black bg-opacity-50 p-6 rounded-lg space-y-4">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required
          className="w-full p-2 rounded-lg bg-white text-black"
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required
          className="w-full p-2 rounded-lg bg-white text-black"
        />
        <button type="submit" className="w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-300">
          Login
        </button>
        {error && (
          <p className="text-red-500 mt-2 text-center font-bold text-lg">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
