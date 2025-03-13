import express from 'express'
import { createPost, deletePost, getAllPosts, getPost, getUsersPost, updatePost } from '../controllers/postController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router=express.Router();

router.get('/',getAllPosts);
router.get('/user',authenticateToken,getUsersPost);
router.post('/',authenticateToken,createPost);
router.get('/:id',getPost);
router.delete('/:id',authenticateToken,deletePost);
router.put('/:id',authenticateToken,updatePost);

export default router;