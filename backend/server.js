import express from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDB } from './database/db.js';
import { startSchedulerEngine } from './scheduler/taskScheduler.js';

const app = express();

initDB();

// Spin up background scheduler process
startSchedulerEngine();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Refactored jobs to clean task endpoints

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Scheduler Cluster listening on port ${config.port}`);
});