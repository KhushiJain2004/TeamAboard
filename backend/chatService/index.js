import express from 'express';
import {Server,Socket} from 'socket.io'
import http from 'http'
import cookieParser from 'cookie-parser';
import { globalErrorHandling } from './middlewares/errorHandling.js';
import chatRouter from './routes/chatRoutes.js'
import { dbConnect } from './config/db.js';
import { timeStamp } from 'console';

const app=express();        // creates the backend application.
const server=http.createServer(app);    //makes an HTTP server that can handle both API requests and WebSockets.

app.use(express.json())
app.use(cookieParser())
app.use('/api/chat',chatRouter);
app.use(globalErrorHandling)

dbConnect();

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})         //initializes Socket.io on the same server, allowing real-time chat features.

// Socket.IO middleware for authentication

//events
io.on("connection",(socket)=>{
    const user=socket.user.id
    console.log("user Connected");

    socket.join(`user:${userId}`)

    socket.on("join_chat",(chatId)=>{
        socket.join(`chat:${chatId}`)

        // Update user status to online in this chat
    // await updateOnlineStatus(userId, chatId, true);
    
    // // Notify other users in the chat
    // socket.to(`chat:${chatId}`).emit('user_status_changed', {
    //   userId,
    //   chatId,
    //   isOnline: true
    // });

    })

    socket.on('leave_chat', async (chatId) => {
        socket.leave(`chat:${chatId}`);
        
        // // Update user status to offline in this chat
        // await updateOnlineStatus(userId, chatId, false);
        
        // // Notify other users in the chat
        // socket.to(`chat:${chatId}`).emit('user_status_changed', {
        //   userId,
        //   chatId,
        //   isOnline: false
        // });
      });

    socket.on("sendMsg",(data)=>{
        const{chatId,text}=data;

        if(isGroupChat) io.to(`chat:${chatId}`).emit("newMessage",{
            text,
            senderId:user,
            chatId ,
            timeStamp:new Date()
        })
    })
})

const PORT= process.env.PORT
server.listen(PORT,()=>console.log(`Server listening at port ${PORT}`));