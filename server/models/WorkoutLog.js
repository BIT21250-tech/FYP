import mongoose from 'mongoose';

const setSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  reps: {
    type: Number,
    required: true,
    min: 0
  }
});

const exerciseLogSchema = new mongoose.Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  exerciseName: {
    type: String,
    required: true
  },
  sets: [setSchema]
});

const workoutLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  workoutPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutPlan'
  },
  workoutPlanTitle: {
    type: String,
    required: true
  },
  exercises: [exerciseLogSchema],
  duration: {
    type: Number,
    required: true,
    min: 1,
    comment: 'Duration in minutes'
  },
  notes: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);

export default WorkoutLog;