import express from 'express';
import {
  getWorkoutPlans,
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan
} from '../controllers/workoutPlanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public/Private routes (some functionality requires auth)
router.get('/', getWorkoutPlans);
router.get('/:id', getWorkoutPlanById);

// Protected routes
router.post('/', protect, createWorkoutPlan);
router.put('/:id', protect, updateWorkoutPlan);
router.delete('/:id', protect, deleteWorkoutPlan);

export default router;