import { JobModel } from '../models/jobModel.js';

export const JobService = {
    createJob: (jobData, userId) => {
        return new Promise((resolve, reject) => {
            if (!jobData.title) return reject(new Error('Job designation name mandatory.'));
            JobModel.create(jobData, userId, (err, insertId) => {
                if (err) return reject(err);
                resolve({ id: insertId, ...jobData, userId });
            });
        });
    },
    getAllJobs: (userId) => {
        return new Promise((resolve, reject) => {
            JobModel.findAllByUser(userId, (err, jobs) => {
                if (err) return reject(err);
                resolve(jobs);
            });
        });
    },
    getJobById: (id, userId) => {
        return new Promise((resolve, reject) => {
            JobModel.findByIdAndUser(id, userId, (err, job) => {
                if (err) return reject(err);
                if (!job) return reject(new Error('Target operational job data payload missing or unauthorized.'));
                resolve(job);
            });
        });
    },
    updateJob: (id, userId, jobData) => {
        return new Promise((resolve, reject) => {
            JobModel.updateByUser(id, userId, jobData, (err, changes) => {
                if (err) return reject(err);
                if (changes === 0) return reject(new Error('Operation blocked. Execution identity mismatch.'));
                resolve({ id, ...jobData, userId });
            });
        });
    },
    deleteJob: (id, userId) => {
        return new Promise((resolve, reject) => {
            JobModel.deleteByUser(id, userId, (err, changes) => {
                if (err) return reject(err);
                if (changes === 0) return reject(new Error('Operation blocked. Execution identity mismatch.'));
                resolve({ message: 'Target task removed successfully from runtime ledger.' });
            });
        });
    }
};