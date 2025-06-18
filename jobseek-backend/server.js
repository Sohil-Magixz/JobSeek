import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import userRoutes from './routes/userRoute.js';

dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected");
}).catch(err=>console.error("MongoDB Error", err));

app.get('/', (req, res) => {
    // console.log("Root route accessed");
    res.send("Job Seek Backend is Running!");
});

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/user', userRoutes);
const PORT = process.env.PORT || 9000;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    console.log(`Try accessing http://192.168.1.2:${PORT}`);
});
