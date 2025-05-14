import WorkoutLog from '../models/WorkoutLog.js';
import mongoose from 'mongoose';

// @desc    Get workout logs for logged in user
// @route   GET /api/workout-logs
// @access  Private
export const getWorkoutLogs = async (req, res) => {
  try {
    const workoutLogs = await WorkoutLog.find({ userId: req.user._id })
      .sort({ date: -1 });
    
    res.json(workoutLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add workout log
// @route   POST /api/workout-logs
// @access  Private
export const addWorkoutLog = async (req, res) => {
  try {
    const { date, workoutPlanId, workoutPlanTitle, exercises, duration, notes } = req.body;
    
    const workoutLog = await WorkoutLog.create({
      date,
      workoutPlanId,
      workoutPlanTitle,
      exercises,
      duration,
      notes,
      userId: req.user._id
    });
    
    res.status(201).json(workoutLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete workout log
// @route   DELETE /api/workout-logs/:id
// @access  Private
export const deleteWorkoutLog = async (req, res) => {
  try {
    const workoutLog = await WorkoutLog.findById(req.params.id);
    
    if (!workoutLog) {
      return res.status(404).json({ message: 'Workout log not found' });
    }
    
    // Check if user owns this workout log
    if (req.user._id.toString() !== workoutLog.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this workout log' });
    }
    
    await WorkoutLog.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Workout log removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get workout progress stats
// @route   GET /api/workout-logs/stats
// @access  Private
export const getProgressStats = async (req, res) => {
  try {
    // Get total workouts count
    const totalWorkouts = await WorkoutLog.countDocuments({ userId: req.user._id });
    
    // Get total workout duration
    const durationResult = await WorkoutLog.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
      { $group: { _id: null, totalDuration: { $sum: '$duration' } } }
    ]);
    
    const totalDuration = durationResult.length > 0 ? durationResult[0].totalDuration : 0;
    
    // Get weekly workout count for the last 4 weeks
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    
    const weeklyWorkouts = await WorkoutLog.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(req.user._id),
          date: { $gte: fourWeeksAgo }
        } 
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: "%Y-%m-%d", date: "$date" } 
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", count: 1, _id: 0 } }
    ]);
    
    // Get most used muscle group (would require exercise data to be more complete in a real app)
    // This is simplified for demo purposes
    const mostUsedMuscleGroup = "Chest"; // Placeholder
    
    res.json({
      totalWorkouts,
      totalDuration,
      mostUsedMuscleGroup,
      weeklyWorkouts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};