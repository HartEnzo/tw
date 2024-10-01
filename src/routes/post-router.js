import express from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/post-conroller.js';
import { authenticateJWT } from '../middlewares/jwt-Authenticate.js';

const router = express.Router();

router.post('/', authenticateJWT, createPost);
router.get('/', authenticateJWT, getPosts);
router.put('/:id', authenticateJWT, updatePost);
router.delete('/:id', authenticateJWT, deletePost);

export default router;