import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv";

import { userRouter } from './routes/user';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

mongoose.connect(process.env.MONGOOSE_URL);

app.listen(3001, ()=>{
    console.log("Server started");
})