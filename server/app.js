import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


// Import routes
import postRouter from './route/PostRouter.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middlewares
app.use(express.json());
// app.use(cors());

// routes
app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
