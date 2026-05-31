import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDB } from './database/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
initDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

# Routes
app.use('/api/jobs', jobRoutes);

# Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});\n