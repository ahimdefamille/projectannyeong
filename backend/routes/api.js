const express = require('express');
const router = express.Router();
const { PollyClient, SynthesizeSpeechCommand } = require('@aws-sdk/client-polly');
const { protect } = require('../middleware/authMiddleware');  // Add the protect middleware
const User = require('../models/Users');
const mongoose = require('mongoose');

// Models
const Module = require('../models/Module');
const Vocabulary = require('../models/Vocabulary');
const { createLesson, getLessonsByModule } = require('../controllers/lessonController.js');
const Exam = require('../models/Exam');

// GET all modules
router.get('/modules', async (req, res) => {
  try {
    const modules = await Module.find().populate('lessons');
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new module (unprotected, but you can add protect if needed)
router.post('/modules', async (req, res) => {
  const module = new Module({
    module_number: req.body.module_number,
    module_title: req.body.module_title,
  });
  try {
    const newModule = await module.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all lessons in a module
router.get('/modules/:moduleId/lessons', getLessonsByModule);

// POST create new lesson (protected)
router.post('/modules/:moduleId/lessons', protect, createLesson);

// POST create new vocabulary for a specific lesson (protected)
router.post('/lessons/:lessonId/vocabularies', protect, async (req, res) => {
  const { lessonId } = req.params;
  const {
    word_korean,
    word_romanization,
    word_english,
    audio_file_url,
    image_url,
    example_sentence_korean,
    example_sentence_english
  } = req.body;

  const newVocabulary = new Vocabulary({
    lesson_id: lessonId,
    word_korean,
    word_romanization,
    word_english,
    audio_file_url,
    image_url,
    example_sentence_korean,
    example_sentence_english
  });

  try {
    const savedVocabulary = await newVocabulary.save();
    res.status(201).json(savedVocabulary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all vocabularies for a specific lesson
router.get('/lessons/:lessonId/vocabularies', async (req, res) => {
  const { lessonId } = req.params;
  try {
    const vocabularies = await Vocabulary.find({ lesson_id: lessonId });
    res.json(vocabularies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new exam for a specific lesson (protected)
router.post('/lessons/:lessonId/exams', protect, async (req, res) => {
  const { lessonId } = req.params;
  const { korean_sentence, english_sentence } = req.body;

  const newExam = new Exam({
    lesson: lessonId,
    korean_sentence,
    english_sentence,
  });

  try {
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all exams for a specific lesson
router.get('/lessons/:lessonId/exams', async (req, res) => {
  const { lessonId } = req.params;
  try {
    const exams = await Exam.find({ lesson: lessonId });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user details by userId (protected)
router.get('/users/:userId', protect, async (req, res) => {
  const { userId } = req.params;
  try {
    // Find the user by ID and exclude password field
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Return user details
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// AWS Polly route for Korean pronunciation
const polly = new PollyClient({
  region: 'us-east-1', 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getPollyAudio = async (text) => {
  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Seoyeon',
    LanguageCode: 'ko-KR',
  };

  const command = new SynthesizeSpeechCommand(params);
  return await polly.send(command);
};

router.post('/polly', async (req, res) => {
  const { word_korean } = req.body;

  try {
    const result = await getPollyAudio(word_korean);
    const audioStream = result.AudioStream;

    res.set({ 'Content-Type': 'audio/mpeg' });

    audioStream.pipe(res);
    
    audioStream.on('error', (err) => {
      console.error('Error streaming audio:', err);
      res.status(500).json({ message: 'Streaming audio failed' });
    });
  } catch (error) {
    console.error('Error with AWS Polly:', error);
    res.status(500).json({ message: 'Polly speech synthesis failed' });
  }
});

// PATCH /api/user/completedLessons
router.patch('/user/completedLessons', protect, async (req, res) => {
  const { lessonId } = req.body; // Get lessonId from request body
  try {
      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Validate lessonId
      if (!lessonId) {
          return res.status(400).json({ message: 'Lesson ID is required' });
      }

      // Check if lessonId is already in completedLessons
      if (!user.completedLessons.includes(lessonId)) {
          user.completedLessons.push(lessonId);
          await user.save();
      }
      res.status(200).json({ message: 'Lesson marked as completed', completedLessons: user.completedLessons });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/user/completedLessons', protect, async (req, res) => {
  const { lessonId } = req.body; // Get lessonId from request body
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Convert lessonId to ObjectId using the 'new' keyword
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);

    // Filter out completed lessons
    user.completedLessons = user.completedLessons.filter(id => !id.equals(lessonObjectId));


    await user.save();
    res.status(200).json({ message: 'Lesson marked as not completed' });
  } catch (error) {
    console.error('Error in delete:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET completed lessons for the logged-in user (protected)
router.get('/user/completedLessons', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('completedLessons');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user's completed lessons
    res.status(200).json(user.completedLessons);
  } catch (error) {
    console.error('Error fetching completed lessons:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
