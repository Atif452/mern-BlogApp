import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import cors from 'cors'
import postRoute from './routes/PostRoute.js';


const app = express();

app.use(express.json());


dotenv.config()

connectDB();
const corsOptions = {
    origin: "http://localhost:5173", // Allow requests only from this origin
  
  };
app.use(cors(corsOptions));


app.use("/", userRoute)
app.use("/" , postRoute)



app.listen(8000, ()=>{
    console.log('Server is running on port 8000');
})