import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'

dotenv.config();

const app=express();
const PORT=process.env.PORT;




//middleware
app.use(cors());
app.use(express.json());


//test
app.get('/',(req,res)=>{
    res.send('Api is working');
});

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at http://localhost:${PORT}`);
    })
})

