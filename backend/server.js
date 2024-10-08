import express from 'express';
import dotenv from 'dotenv';
import { triggerRouter } from './routes/trigger.js';
import { workflowRouter } from './routes/workflow.js'; // Ensure this is correct
import { conditionRouter } from './routes/condition.js';
import { actionRouter } from './routes/action.js';
import { userRouter } from './routes/user.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';  // Import cookie-parser

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://66fdccfe1c356faf4d63aed4--argv.netlify.app'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(cookieParser());  // Use cookie-parser
 
// Routes
app.use('/api/triggers', triggerRouter);
app.use('/api/workflows', workflowRouter); // Verify this path
app.use('/api/conditions', conditionRouter);
app.use('/api/actions', actionRouter);
app.use('/api/auth', userRouter); 

// Root route
app.get('/', (req, res) => {
    res.send("Workflow Automation Project is running!");
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




