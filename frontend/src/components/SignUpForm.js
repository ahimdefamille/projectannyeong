import React, { useState } from 'react';
import { signupUser } from '../services/api'; // Ensure you import the signupUser function

const SignupForm = ({ onShowLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // New state for success message

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 8 || password.length > 16) {
      setError('Password must be between 8 and 16 characters.');
      return;
    }

    // Validate username length
    if (username.length < 8) {
      setError('Username must be at least 8 characters long.');
      return;
    }

    try {
      // Call signupUser with the current form data
      const result = await signupUser(username, email, password);
      console.log('Signup successful:', result);
      setSuccess(true); // Set success message
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Signup error:', error);

      // Set the error message from the response
      setError(error.message); // Use error.message from the thrown error
      setSuccess(false); // Clear success message
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-black bg-opacity-50 p-6 rounded-lg space-y-4">
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Username (min. 8 characters)"
        required
        className="w-full p-2 rounded-lg bg-white text-black"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
        className="w-full p-2 rounded-lg bg-white text-black"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password (8-16 characters)"
        required
        className="w-full p-2 rounded-lg bg-white text-black"
      />
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        placeholder="Re-enter Password"
        required
        className="w-full p-2 rounded-lg bg-white text-black"
      />
      <button type="submit" className="w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-300">
        Sign Up
      </button>
      {error && (
        <p className="text-red-500 mt-2">
          {error.includes('Login instead') ? (
            <>
              {error} <span className="text-blue-500 cursor-pointer" onClick={onShowLogin}>Login</span>
            </>
          ) : (
            error
          )}
        </p>
      )}
      {success && (
        <p className="bg-green-100 text-green-800 p-4 rounded-lg mt-4 text-lg font-bold flex items-center justify-center">
          🎉 Signup successful! <span className="text-blue-500 cursor-pointer ml-2" onClick={onShowLogin}>Login now?</span>
        </p>
      )}
    </form>
  );
};

export default SignupForm;
