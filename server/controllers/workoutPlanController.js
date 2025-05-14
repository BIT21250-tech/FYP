import WorkoutPlan from '../models/WorkoutPlan.js';

// @desc    Get all workout plans
// @route   GET /api/workout-plans
// @access  Public/Private (filtered by public status)
export const getWorkoutPlans = async (req, res) => {
  try {
    const query = req.user 
      ? { $or: [{ isPublic: true }, { createdBy: req.user._id }] }
      : { isPublic: true };
    
    // Apply filters if provided
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }
    
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const workoutPlans = await WorkoutPlan.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(workoutPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get workout plan by ID
// @route   GET /api/workout-plans/:id
// @access  Public/Private (based on public status)
export const getWorkoutPlanById = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('exercises.exerciseId', 'name videoUrl muscleGroup');
    
    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    
    // Check if user is authorized to view this plan
    if (!workoutPlan.isPublic && (!req.user || req.user._id.toString() !== workoutPlan.createdBy._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to view this workout plan' });
    }
    
    res.json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create workout plan
// @route   POST /api/workout-plans
// @access  Private
export const createWorkoutPlan = async (req, res) => {
  try {
    const { title, description, category, difficulty, duration, exercises, isPublic } = req.body;
    
    const workoutPlan = await WorkoutPlan.create({
      title,
      description,
      category,
      difficulty,
      duration,
      exercises,
      createdBy: req.user._id,
      isPublic: isPublic !== undefined ? isPublic : true
    });
    
    res.status(201).json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update workout plan
// @route   PUT /api/workout-plans/:id
// @access  Private
export const updateWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id);
    
    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    
    // Check if user owns this workout plan
    if (req.user._id.toString() !== workoutPlan.createdBy.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this workout plan' });
    }
    
    // Update fields
    const { title, description, category, difficulty, duration, exercises, isPublic } = req.body;
    
    if (title) workoutPlan.title = title;
    if (description) workoutPlan.description = description;
    if (category) workoutPlan.category = category;
    if (difficulty) workoutPlan.difficulty = difficulty;
    if (duration) workoutPlan.duration = duration;
    if (exercises) workoutPlan.exercises = exercises;
    if (isPublic !== undefined) workoutPlan.isPublic = isPublic;
    
    const updatedWorkoutPlan = await workoutPlan.save();
    
    res.json(updatedWorkoutPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete workout plan
// @route   DELETE /api/workout-plans/:id
// @access  Private
export const deleteWorkoutPlan = async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id);
    
    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    
    // Check if user owns this workout plan
    if (req.user._id.toString() !== workoutPlan.createdBy.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this workout plan' });
    }
    
    await WorkoutPlan.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Workout plan removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};