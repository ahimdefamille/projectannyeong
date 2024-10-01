const express = require('express');
const router = express.Router();
const { PollyClient, SynthesizeSpeechCommand } = require('@aws-sdk/client-polly');

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

// POST create new module
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

// GET all lessons in a module (use the controller function)
router.get('/modules/:moduleId/lessons', getLessonsByModule);

// POST create new lesson
router.post('/modules/:moduleId/lessons', createLesson);


// POST create new vocabulary for a specific lesson
router.post('/lessons/:lessonId/vocabularies', async (req, res) => {
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


const polly = new PollyClient({
  region: 'us-east-1', // Replace with your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getPollyAudio = async (text) => {
  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Seoyeon', // Choose a Korean voice (e.g., 'Seoyeon' or 'Yujin')
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

    // Set the response content type
    res.set({
      'Content-Type': 'audio/mpeg',
    });

    // Pipe the audio stream directly to the response
    audioStream.pipe(res);
    
    // Handle stream errors
    audioStream.on('error', (err) => {
      console.error('Error streaming audio:', err);
      res.status(500).json({ message: 'Streaming audio failed' });
    });
  } catch (error) {
    console.error('Error with AWS Polly:', error);
    res.status(500).json({ message: 'Polly speech synthesis failed' });
  }
});

// POST create a new exam for a specific lesson
router.post('/lessons/:lessonId/exams', async (req, res) => {
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



module.exports = router;
