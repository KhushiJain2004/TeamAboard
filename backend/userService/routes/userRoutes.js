import express from 'express'
import { verifyToken } from '../midddlewares/verifyToken.js';
import { getAllUsers,getUser,updateUser,deleteUser } from '../controllers/userController.js';
const userRouter=express.Router();

userRouter.get('/all',getAllUsers);
userRouter.get('/',verifyToken,getUser);
userRouter.put('/:id',verifyToken,updateUser);
userRouter.delete('/:id',verifyToken,deleteUser);

export default userRouter;