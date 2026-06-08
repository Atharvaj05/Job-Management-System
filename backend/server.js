import express from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDB } from './database/db.js';

const app = express();

initDB();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

// Namespace API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Core processing framework executing dynamically on port ${config.port}`);
});