import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './lib/mongo.js';
import userRoute from './routes/auth.js';
import message from './routes/message.js';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', userRoute);
app.use('/message', message);


app.get('/',(req, res) => {
    res.send("Whats up");
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Backend running on port ${PORT}`);
});
