import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify'; // Import DOMPurify
import GrammarContent from '../content/module_1/grammar/GrammarContent';

const GrammarPage = () => {
  const { lessonId } = useParams();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Get the current language
  const content = GrammarContent[lessonId]?.[currentLanguage]; // Get the content based on the language

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
        <p className="text-white text-xl font-semibold">Sorry, no grammar content available for this lesson.</p>
      </div>
    );
  }

  // Sanitize the content to prevent XSS
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="h-full flex flex-col overflow-hidden"> {/* Allow vertical layout and hide overflow */}
      <div className="flex-1 overflow-y-auto"> {/* Scrollable area */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-8">
          <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto max-w-4xl">
            <div 
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none" 
              dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;
