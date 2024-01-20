import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { userRouter } from './routes/user';


const app = express()

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');

app.listen(3001, ()=>{
    console.log("Server started");
})