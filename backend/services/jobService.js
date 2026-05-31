import { JobModel } from '../models/jobModel.js';

// The Service Layer contains core business operations. 
// In V1/V2, this layer will orchestrate background workers or message queues.
export const JobService = {
    createJob: (jobData) => {
        return new Promise((resolve, reject) => {
            if (!jobData.title) return reject(new Error('Job title is required'));
            JobModel.create(jobData, (err, insertId) => {
                if (err) return reject(err);
                resolve({ id: insertId, ...jobData });
            });
        });
    },

    getAllJobs: () => {
        return new Promise((resolve, reject) => {
            JobModel.findAll((err, jobs) => {
                if (err) return reject(err);
                resolve(jobs);
            });
        });
    },

    getJobById: (id) => {
        return new Promise((resolve, reject) => {
            JobModel.findById(id, (err, job) => {
                if (err) return reject(err);
                if (!job) return reject(new Error('Job not found'));
                resolve(job);
            });
        });
    },

    updateJob: (id, jobData) => {
        return new Promise((resolve, reject) => {
            JobModel.update(id, jobData, (err, changes) => {
                if (err) return reject(err);
                if (changes === 0) return reject(new Error('Job not found or no changes made'));
                resolve({ id, ...jobData });
            });
        });
    },

    deleteJob: (id) => {
        return new Promise((resolve, reject) => {
            JobModel.delete(id, (err, changes) => {
                if (err) return reject(err);
                if (changes === 0) return reject(new Error('Job not found'));
                resolve({ message: 'Job successfully deleted' });
            });
        });
    }
};\n