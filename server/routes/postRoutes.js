import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  addComment,
  likePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes
router.post('/', protect, createPost);
router.post('/:id/comments', protect, addComment);
router.put('/:id/like', protect, likePost);

export default router;