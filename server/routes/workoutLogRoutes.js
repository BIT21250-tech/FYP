import express from 'express';
import {
  getWorkoutLogs,
  addWorkoutLog,
  deleteWorkoutLog,
  getProgressStats
} from '../controllers/workoutLogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getWorkoutLogs);
router.post('/', addWorkoutLog);
router.delete('/:id', deleteWorkoutLog);
router.get('/stats', getProgressStats);

export default router;