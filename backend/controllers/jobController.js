import { JobService } from '../services/jobService.js';

export const createJob = async (req, res, next) => {
    try {
        const job = await JobService.createJob(req.body, req.user.id);
        res.status(201).json(job);
    } catch (err) { next(err); }
};

export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await JobService.getAllJobs(req.user.id);
        res.status(200).json(jobs);
    } catch (err) { next(err); }
};

export const getJobById = async (req, res, next) => {
    try {
        const job = await JobService.getJobById(req.params.id, req.user.id);
        res.status(200).json(job);
    } catch (err) { next(err); }
};

export const updateJob = async (req, res, next) => {
    try {
        const job = await JobService.updateJob(req.params.id, req.user.id, req.body);
        res.status(200).json(job);
    } catch (err) { next(err); }
};

export const deleteJob = async (req, res, next) => {
    try {
        const result = await JobService.deleteJob(req.params.id, req.user.id);
        res.status(200).json(result);
    } catch (err) { next(err); }
};