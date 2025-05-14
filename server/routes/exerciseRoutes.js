import express from 'express';
import {
  getExercises,
  getExerciseById,
  createExercise
} from '../controllers/exerciseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getExercises);
router.get('/:id', getExerciseById);

// Private routes (admin only in a real app)
router.post('/', protect, createExercise);

export default router;