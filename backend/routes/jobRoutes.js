import express from 'express';
import * as JobController from '../controllers/jobController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforce authentication context across all endpoints in this router
router.use(protectRoute);

router.post('/', JobController.createJob);
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);
router.put('/:id', JobController.updateJob);
router.delete('/:id', JobController.deleteJob);

export default router;