import Exercise from '../models/Exercise.js';

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
export const getExercises = async (req, res) => {
  try {
    const query = {};
    
    // Apply filters if provided
    if (req.query.muscleGroup) {
      query.muscleGroup = req.query.muscleGroup;
    }
    
    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }
    
    if (req.query.equipment) {
      query.equipment = req.query.equipment;
    }
    
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    
    const exercises = await Exercise.find(query).sort({ name: 1 });
    
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get exercise by ID
// @route   GET /api/exercises/:id
// @access  Public
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create exercise (admin only in a real app)
// @route   POST /api/exercises
// @access  Private/Admin
export const createExercise = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      videoUrl, 
      instructions, 
      muscleGroup, 
      equipment, 
      difficulty, 
      thumbnailUrl 
    } = req.body;
    
    // Check if exercise already exists
    const exerciseExists = await Exercise.findOne({ name });
    
    if (exerciseExists) {
      return res.status(400).json({ message: 'Exercise already exists' });
    }
    
    const exercise = await Exercise.create({
      name,
      description,
      videoUrl,
      instructions,
      muscleGroup,
      equipment,
      difficulty,
      thumbnailUrl
    });
    
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};