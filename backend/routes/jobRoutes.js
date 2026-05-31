import express from 'express';
import * as JobController from '../controllers/jobController.js';

const router = express.Router();

router.post('/', JobController.createJob);
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);
router.put('/:id', JobController.updateJob);
router.delete('/:id', JobController.deleteJob);

export default router;\n