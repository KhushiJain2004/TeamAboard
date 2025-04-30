import express from 'express';
import {Server,Socket} from 'socket.io'
import http from 'http'
import cookieParser from 'cookie-parser';
import { globalErrorHandling } from './middlewares/errorHandling.js';
import chatRouter from './routes/chatRoutes.js'
import { dbConnect } from './config/db.js';

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


const PORT= process.env.PORT
app.listen(PORT,()=>console.log(`Server listening at port ${PORT}`));