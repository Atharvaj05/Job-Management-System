import express from 'express';
import * as TaskController from '../controllers/taskController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectRoute);

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/:id/logs', TaskController.getTaskLogs);

export default router;