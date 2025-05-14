import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  instructions: {
    type: [String],
    required: [true, 'Instructions are required']
  },
  muscleGroup: {
    type: String,
    required: true,
    enum: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body', 'Cardio']
  },
  equipment: {
    type: String,
    required: true,
    enum: ['None', 'Dumbbells', 'Barbell', 'Kettlebell', 'Machine', 'Cable', 'Resistance Band', 'Bodyweight', 'Other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  thumbnailUrl: {
    type: String,
    default: function() {
      // Default thumbnail if none provided
      return `https://img.youtube.com/vi/${this.videoUrl.split('v=')[1]}/0.jpg`;
    }
  }
}, {
  timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;