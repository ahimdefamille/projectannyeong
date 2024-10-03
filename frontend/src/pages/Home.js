import React, { useEffect, useState } from 'react';
import { fetchModules, fetchLessonsByModule, markLessonCompleted, unmarkLessonCompleted, fetchCompletedLessons } from '../services/api';
import { ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [modules, setModules] = useState([]);
    const [expandedModule, setExpandedModule] = useState(null);
    const [lessons, setLessons] = useState({});
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        const loadModulesAndCompletedLessons = async () => {
            try {
                const fetchedModules = await fetchModules();
                setModules(fetchedModules);

                const fetchedCompletedLessons = await fetchCompletedLessons();
                const completedLessonIds = fetchedCompletedLessons.map(lesson => lesson._id);
                setCompletedLessons(completedLessonIds);

                // Fetch lessons for all modules
                const allLessons = {};
                for (const module of fetchedModules) {
                    const moduleLessons = await fetchLessonsByModule(module._id);
                    allLessons[module._id] = moduleLessons;
                }
                setLessons(allLessons);
            } catch (error) {
                console.error("Error loading modules or completed lessons:", error);
            }
        };

        loadModulesAndCompletedLessons();
    }, []);

    const toggleModule = (moduleId) => {
        setExpandedModule(expandedModule === moduleId ? null : moduleId);
    };

    const handleLessonClick = async (lessonId, moduleId) => {
        if (completedLessons.includes(lessonId)) {
            try {
                await unmarkLessonCompleted(lessonId);
                setCompletedLessons(prevCompleted => prevCompleted.filter(id => id !== lessonId));
            } catch (error) {
                console.error("Error unmarking lesson as completed:", error);
            }
        } else {
            try {
                await markLessonCompleted(lessonId);
                setCompletedLessons(prevCompleted => [...prevCompleted, lessonId]);
            } catch (error) {
                console.error("Error marking lesson as completed:", error);
            }
        }
    };

    const isModuleComplete = (moduleId) => {
        const moduleLessons = lessons[moduleId] || [];
        return moduleLessons.length > 0 && moduleLessons.every(lesson => completedLessons.includes(lesson._id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-8">
            <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Your Learning Quest</h1>
                <ul className="space-y-6">
                    {modules.map((module) => (
                        <motion.li
                            key={module._id}
                            className={`bg-blue-50 rounded-lg p-4 shadow-md transition-all duration-300 ${
                                isModuleComplete(module._id) ? 'border-2 border-green-500' : ''
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div
                                className={`flex items-center justify-between text-blue-800 p-2 rounded-lg 
                                    ${expandedModule === module._id ? 'bg-blue-200' : 'hover:bg-blue-100'} 
                                    transition cursor-pointer`}
                                onClick={() => toggleModule(module._id)}
                            >
                                <span className="text-xl font-semibold">Module {module.module_number}: {module.module_title}</span>
                                <div className="flex items-center">
                                    {isModuleComplete(module._id) && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="mr-2"
                                        >
                                            <CheckCircle className="text-green-500 w-6 h-6" />
                                        </motion.div>
                                    )}
                                    {expandedModule === module._id ? (
                                        <ChevronDown className="text-blue-600" />
                                    ) : (
                                        <ChevronRight className="text-blue-600" />
                                    )}
                                </div>
                            </div>
                            <AnimatePresence>
                                {expandedModule === module._id && lessons[module._id] && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2"
                                    >
                                        {lessons[module._id].map((lesson) => (
                                            <motion.div
                                                key={lesson._id}
                                                onClick={() => handleLessonClick(lesson._id, module._id)}
                                                className={`relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer shadow-md
                                                    ${completedLessons.includes(lesson._id) 
                                                        ? 'bg-green-500 text-white' 
                                                        : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span className="text-xs font-medium">{lesson.lesson_number}</span>
                                                {completedLessons.includes(lesson._id) && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                        className="absolute -top-1 -right-1"
                                                    >
                                                        <CheckCircle className="text-white bg-green-600 rounded-full w-4 h-4" />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;