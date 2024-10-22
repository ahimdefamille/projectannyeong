import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Lock } from 'lucide-react';
import { fetchModules } from '../services/api';
import Button from '../components/Button';

const Learn = () => {
  const [modules, setModules] = useState([]);
  const [isVip, setIsVip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('VIP status updated:', isVip);
  }, [isVip]);

  useEffect(() => {
    const getModules = async () => {
      try {
        const modulesData = await fetchModules();
        setModules(modulesData);
      } catch (error) {
        console.error('Failed to fetch modules', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsVip(decoded.isVip || false);
    }

    getModules();
  }, []);

  const handleModuleClick = (module) => {
    if (module.isVipExclusive && !isVip) {
      alert('This is exclusive content for VIP users, please upgrade your account.');
    } else {
      navigate(`/learn/module/${module.module_number}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Learn Korean</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module._id}
              className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{module.module_title}</h2>
                {module.isVipExclusive && !isVip && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 border border-red-500">
                    <Lock className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              <p className="text-gray-600 font-medium mb-4">Module {module.module_number}</p>
              <Button
                onClick={() => handleModuleClick(module)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                Start Learning
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
