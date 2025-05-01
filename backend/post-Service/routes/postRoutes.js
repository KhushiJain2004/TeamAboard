import express from 'express'
import { createPost, deletePost, filterPosts, getAllPosts, getPost, getUsersPost, updatePost } from '../controllers/postController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { showInterestInPost, viewInterestedUsers } from '../controllers/postApplications.js';

const router=express.Router();

router.get('/',getAllPosts);
router.get('/user',authenticateToken,getUsersPost);
// router.get('/:userId',authenticateToken,getUsersPost);
router.get('/filter',authenticateToken,filterPosts);
router.post('/',authenticateToken,createPost);
router.get('/:id',getPost);
router.delete('/:id',authenticateToken,deletePost);
router.put('/:id',authenticateToken,updatePost);

router.post('/apply/:id',authenticateToken,showInterestInPost);
router.get('/viewApplications/:id',authenticateToken,viewInterestedUsers);

export default router;