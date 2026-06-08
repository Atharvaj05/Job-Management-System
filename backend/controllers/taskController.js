import { TaskModel } from '../models/taskModel.js';
import { LogModel } from '../models/logModel.js';

export const createTask = (req, res, next) => {
    const { title, description, executeAt } = req.body;
    if (!title || !executeAt) {
        return res.status(400).json({ error: "Missing required title or target executeAt timestamp." });
    }

    TaskModel.create({ title, description, executeAt }, req.user.id, (err, taskId) => {
        if (err) return next(err);
        res.status(201).json({ id: taskId, title, description, executeAt, status: 'Scheduled' });
    });
};

export const getTasks = (req, res, next) => {
    TaskModel.findAllByUser(req.user.id, (err, tasks) => {
        if (err) return next(err);
        res.status(200).json(tasks);
    });
};

export const getTaskLogs = (req, res, next) => {
    LogModel.getLogsByTask(req.params.id, req.user.id, (err, logs) => {
        if (err) return next(err);
        res.status(200).json(logs);
    });
};