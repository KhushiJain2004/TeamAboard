import express from 'express'
import { verifyToken } from '../midddlewares/verifyToken.js';
import { getAllUsers,getUser,updateUser,deleteUser, getUserProfileWithPosts, findUserWithId, userInterests } from '../controllers/userController.js';
import { filterUsers, filterWithText } from '../controllers/filterUsersController.js';
const userRouter=express.Router();

userRouter.get('/all',getAllUsers);
userRouter.get('/interests/:id',userInterests);
userRouter.get('/',verifyToken,getUser);
userRouter.get('/profile',verifyToken,getUserProfileWithPosts);
userRouter.get('/filter',filterUsers);
userRouter.get('/search',filterWithText);
userRouter.get('/:userId',findUserWithId);
userRouter.put('/:id',verifyToken,updateUser);
userRouter.delete('/:id',verifyToken,deleteUser);

export default userRouter;