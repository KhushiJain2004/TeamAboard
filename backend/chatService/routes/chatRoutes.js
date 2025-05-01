import { addMemberToGroupChat, createChat, deleteChat, getUserChats, openChatWithId, removeMember } from "../controllers/chatController.js";
import express from 'express';
import { verifyToken } from "../middlewares/authMiddleware.js";
import { sendMsg } from "../controllers/messageController.js";

const router=express.Router();

router.get('/',verifyToken,getUserChats);
router.get('/:chatId',verifyToken,openChatWithId);
router.post('/create',verifyToken,createChat);
router.post('/delete/:chatId',verifyToken,deleteChat);
router.post('/addToGroup/:chatId',verifyToken,addMemberToGroupChat);
router.post('/removeFromGroup/:chatId',verifyToken,removeMember);

router.post('/sendMsg/:chatId',verifyToken,sendMsg);

export default router;