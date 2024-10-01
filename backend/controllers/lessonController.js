const Lesson = require('../models/Lesson');

// Controller function to get lessons by module ID
const getLessonsByModule = async (req, res) => {
    try {
      const lessons = await Lesson.find({ module: req.params.moduleId });
  
      // Check if vocabularies are needed before populating
      if (lessons.length > 0) {
        await Lesson.populate(lessons, { path: 'vocabularies', strictPopulate: false });
      }
  
      res.json(lessons);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Controller function to create a new lesson
const createLesson = async (req, res) => {
  const { moduleId } = req.params;
  const { lesson_number, title, subitems } = req.body;

  const newLesson = new Lesson({
    module: moduleId,
    lesson_number,
    title,
    subitems,
  });

  try {
    const savedLesson = await newLesson.save();
    res.status(201).json(savedLesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating lesson' });
  }
};

module.exports = {
  getLessonsByModule,
  createLesson
};
