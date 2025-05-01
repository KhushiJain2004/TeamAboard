import express from 'express';
import cors from 'cors'
import { globalErrorHandling, logRequest } from './middlewares/middleware.js';
import pool from './config/db.js';
import { createPostTable } from './models/postModel.js';
import postRouter from './routes/postRoutes.js'
import cookieParser from 'cookie-parser';

const app=express();

app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(cookieParser())

app.use(logRequest);

// app.get('/',(req,res)=>res.status(200).json({
//   success:true,
//   message:'Post Service is running'}))
app.get("/", async (req, res) => {
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("result", result.rows);
    res.send(`The database name is : ${result.rows[0].current_database}`);
  });

createPostTable();

app.use ('/api/posts',postRouter);

app.get('*',(req,res,next)=>
{
    const errorObj=new Error('Route not found')
    errorObj.status=404;
    next(errorObj)
})
app.use(globalErrorHandling);


const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Post Service Server running at: http://localhost:${PORT}`));