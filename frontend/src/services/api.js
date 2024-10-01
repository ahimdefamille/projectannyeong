const API_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchModules = async () => {
  try {
    const response = await fetch(`${API_URL}/api/modules`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
};

export const fetchLessonsByModule = async (moduleId) => {
  try {
    const response = await fetch(`${API_URL}/api/modules/${moduleId}/lessons`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

export const fetchVocabularyByLesson = async (lessonId) => {
  try {
    const response = await fetch(`${API_URL}/api/lessons/${lessonId}/vocabularies`);
    if (!response.ok) {
      throw new Error('Failed to fetch vocabularies');
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching vocabularies:", error);
    throw error;
  }
};

// New function to fetch exams by lesson
export const fetchExamsByLesson = async (lessonId) => {
  try {
    const response = await fetch(`${API_URL}/api/lessons/${lessonId}/exams`);
    if (!response.ok) {
      throw new Error('Failed to fetch exams');
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
};

const saveToCache = (word_korean, audioBlob) => {
  const reader = new FileReader();
  reader.readAsDataURL(audioBlob);
  
  reader.onloadend = () => {
    const base64data = reader.result; // This is a base64 string
    localStorage.setItem(`audio_${word_korean}`, base64data);
    console.log(`Saved audio for ${word_korean} to localStorage`);
  };
};

export const playPollyAudio = async (word_korean) => {
  try {
    const cachedAudio = localStorage.getItem(`audio_${word_korean}`);
    
    if (cachedAudio) {
      // If cached, play the base64 audio
      const audio = new Audio(cachedAudio);
      audio.play();
      console.log(`Playing cached audio for ${word_korean}`);
    } else {
      // If not cached, call Polly API to generate the audio
      const response = await fetch(`${API_URL}/api/polly`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word_korean }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        saveToCache(word_korean, audioBlob); // Save audio to cache

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        console.log(`Playing newly fetched audio for ${word_korean}`);
      } else {
        console.error('Polly API call failed');
      }
    }
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};
