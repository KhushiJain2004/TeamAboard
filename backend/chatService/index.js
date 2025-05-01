import express from 'express';
import {Server,Socket} from 'socket.io'
import http from 'http'
import cookieParser from 'cookie-parser';
import { globalErrorHandling } from './middlewares/errorHandling.js';
import chatRouter from './routes/chatRoutes.js'
import { dbConnect } from './config/db.js';
import { timeStamp } from 'console';
import cors from "cors"

const app=express();        
const server=http.createServer(app);    

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
app.use('/api/chat',chatRouter);
app.use(globalErrorHandling)

dbConnect();

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})         
io.on("connection",(socket)=>{
    const user=socket.user.id
    console.log("user Connected");


    socket.on("join_chat",(chatId)=>{
        socket.join(`chat:${chatId}`)

    })

    socket.on('leave_chat', async (chatId) => {
        socket.leave(`chat:${chatId}`);
      });

    socket.on("sendMsg",(data)=>{
        const{chatId,text}=data;

        io.to(`chat:${chatId}`).emit("newMessage",{
            text,
            senderId:user,
            chatId ,
            timeStamp:new Date()
        })
    })
})

const PORT= process.env.PORT
server.listen(PORT,()=>console.log(`Server listening at port ${PORT}`));