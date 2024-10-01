import React, { useEffect, useState } from 'react';
import { Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchModules } from '../services/api';

const Learn = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getModules = async () => {
      try {
        const modulesData = await fetchModules();
        setModules(modulesData);
      } catch (error) {
        console.error("Failed to fetch modules", error);
      }
    };

    getModules();
  }, []);

  const handleModuleClick = (index) => {
    navigate(`/learn/module/${index + 1}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Learn Korean</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={module._id}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleModuleClick(index)}
            >
              <div className="flex items-center mb-4">
                <Layout className="w-10 h-10 text-blue-500" />
                <h2 className="text-xl font-bold ml-3 text-gray-800">{module.module_title}</h2>
              </div>
              <p className="text-gray-600 font-medium">Module {module.module_number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;