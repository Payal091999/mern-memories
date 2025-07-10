// routes/posts.js
import express from 'express';
import rateLimit from 'express-rate-limit';
import { validatePost } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from '../controllers/posts.js';

const router = express.Router();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all requests
router.use(limiter);

// Routes with validation and authentication
router.get('/', getPosts); // No auth needed for viewing posts
router.post('/', authenticate, validatePost, createPost);
router.get('/:id', getPost);
router.patch('/:id', authenticate, validatePost, updatePost);
router.delete('/:id', authenticate, deletePost);
router.patch('/:id/likePost', authenticate, likePost);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    code: err.code || 'INTERNAL_ERROR'
  });
});

export default router;
