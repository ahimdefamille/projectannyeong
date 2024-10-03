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

export const signupUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Signup failed'); // Include the specific error message
    }

    const data = await response.json();
    return data; // Return the response data if signup is successful
  } catch (error) {
    // Rethrow the error to be handled in the SignupForm component
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Login failed');
      }

      const data = await response.json();

      if (data.token) {
          localStorage.setItem('token', data.token);
          // Store user data (including id) in local storage or return it for context
          return { token: data.token, user: data.user }; // Ensure user is included
      }

      throw new Error('No token received');
  } catch (error) {
      console.error("Error logging in:", error);
      throw error;
  }
};


export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return userData; // Return user data
    } else {
      console.error('Failed to fetch user details:', response.status);
      throw new Error('Failed to fetch user details');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; // Rethrow the error for further handling
  }
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

export const markLessonCompleted = async (lessonId) => {
  const token = localStorage.getItem('token');

  try {
      const response = await fetch(`${API_URL}/api/user/completedLessons`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ lessonId })
      });

      if (!response.ok) {
          throw new Error('Failed to mark lesson as completed');
      }

      return await response.json();
  } catch (error) {
      console.error("Error marking lesson completed:", error);
      throw error;
  }
};


export const unmarkLessonCompleted = async (lessonId) => {
  const token = localStorage.getItem('token'); // Ensure you're fetching the token here

  try {
      const response = await fetch(`${API_URL}/api/user/completedLessons`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ lessonId })
      });

      if (!response.ok) {
          throw new Error('Failed to unmark lesson as completed');
      }

      return await response.json();
  } catch (error) {
      console.error("Error unmarking lesson completed:", error);
      throw error;
  }
};


// Function to fetch completed lessons
export const fetchCompletedLessons = async () => {
  try {
      const response = await fetch(`${API_URL}/api/user/completedLessons`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch completed lessons');
      }

      return await response.json(); // Return completed lessons
  } catch (error) {
      console.error('Error fetching completed lessons:', error);
      throw error; // Rethrow the error for further handling
  }
};