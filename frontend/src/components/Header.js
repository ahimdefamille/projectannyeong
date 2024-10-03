import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { jwtDecode } from 'jwt-decode';
import { ChevronDownIcon, GlobeIcon, UserIcon, LogOutIcon } from 'lucide-react';

const Header = () => {
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        fetchUserDetails(userId);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUsername(userData.username);
      } else {
        console.error('Failed to fetch user details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    navigate('/');
  };

  return (
    <header className="bg-black shadow-lg py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <Link 
        to="/home" 
        className="text-2xl font-bold text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-blue-500">Project</span> Annyeong
      </Link>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="flex items-center space-x-2 text-white">
            <GlobeIcon className="w-5 h-5" />
            <select 
              onChange={handleLanguageChange} 
              className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
            >
              <option value="en" className="text-gray-800">English</option>
              <option value="vi" className="text-gray-800">Tiếng Việt</option>
            </select>
          </div>
        </div>
        {username && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 focus:outline-none"
            >
              <UserIcon className="w-5 h-5" />
              <span>{username}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link 
                    to="/account-settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Account Settings
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;