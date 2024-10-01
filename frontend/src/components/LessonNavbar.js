import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { fetchLessonsByModule } from '../services/api';

const LessonNavbar = ({ moduleNumber, moduleId }) => {
    const [expandedLesson, setExpandedLesson] = useState(null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const loadLessons = async () => {
            try {
                const fetchedLessons = await fetchLessonsByModule(moduleId);
                setLessons(fetchedLessons);
            } catch (error) {
                console.error("Error loading lessons:", error);
            }
        };

        loadLessons();
    }, [moduleId]);

    useEffect(() => {
        const storedExpandedLesson = localStorage.getItem(`expandedLesson-${moduleId}`);
        if (storedExpandedLesson) {
            setExpandedLesson(JSON.parse(storedExpandedLesson));
        }
    }, [moduleId]);

    const toggleLesson = (lessonNumber) => {
        const newExpandedLesson = expandedLesson === lessonNumber ? null : lessonNumber;
        setExpandedLesson(newExpandedLesson);
        localStorage.setItem(`expandedLesson-${moduleId}`, JSON.stringify(newExpandedLesson));
    };

    return (
        <nav className="w-64 flex flex-col h-screen bg-blue-50 shadow-md relative overflow-y-auto">
            <div className="p-4 bg-blue-100 w-full">
                <h1 className="text-2xl font-bold text-blue-800">Module {moduleNumber}</h1>
                <NavLink to="/learn" className="mt-4 inline-block bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                    Back to Learn
                </NavLink>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col space-y-2 p-4 w-full">
                    {lessons.map((lesson) => (
                        <li key={lesson._id} className="w-full">
                            <div
                                className={`flex items-center justify-between text-blue-800 p-4 rounded-lg 
                                    ${expandedLesson === lesson.lesson_number ? 'bg-blue-200' : 'hover:bg-blue-100'} 
                                    transition cursor-pointer`}
                                onClick={() => toggleLesson(lesson.lesson_number)}
                            >
                                <span>Lesson {lesson.lesson_number}</span>
                                {expandedLesson === lesson.lesson_number ? <ChevronDown className="text-blue-600" /> : <ChevronRight className="text-blue-600" />}
                            </div>
                            {expandedLesson === lesson.lesson_number && (
                                <ul className="pl-8 mt-2 space-y-1">
                                    {lesson.subitems.map((subitem) => (
                                        <li key={subitem}>
                                            <NavLink
                                                to={`/learn/module/${moduleNumber}/lessons/${lesson._id}/${subitem.toLowerCase()}`}
                                                className={({ isActive }) => 
                                                    `block text-blue-700 py-2 pl-4 rounded-lg transition 
                                                    ${isActive ? 'bg-blue-200 font-semibold' : 'hover:bg-blue-100'}`
                                                }
                                            >
                                                <span>{subitem}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default LessonNavbar;
