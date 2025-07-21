import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import campRoutes from './routes/camp.route.js'
import campUserRoutes from './routes/userCamp.route.js'
dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3500',
    'https://blood-camp.vercel.app',
    'https://blood-admin.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

connectDB();


app.use('/api/camps',campRoutes);
app.use('/api/user/camps',campUserRoutes);
app.get('/', (req, res) => {
    res.send('Backend Running');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
