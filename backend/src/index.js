import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import campRoutes from './routes/camp.route.js'
import adminRoutes from './routes/admin.route.js'
import fileUpload from 'express-fileupload'
dotenv.config();

const app=express();
const PORT=process.env.PORT||5000;




//middleware
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}));
app.use(express.json());
app.use(fileUpload({useTempFiles:true}));


//routes
app.use('/api/camps',campRoutes);
app.use('/api/admin',adminRoutes);


//test
app.get('/',(req,res)=>{
    res.send('Api is working');
});

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at http://localhost:${PORT}`);
    })
}).catch((err)=>{
    console.error("Failed to start server:",err);
    process.exit(1);
})

