import express from 'express'
import cors from 'cors'
import connectToDb from './config/db.js';

const server=express();

server.use(express.json());
server.use(cors());

connectToDb();

const PORT=process.env.PORT
server.listen(PORT,()=>console.log(`server listening at port ${PORT}`));