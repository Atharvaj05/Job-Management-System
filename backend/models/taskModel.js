import db from '../database/db.js';

export const TaskModel = {
    create: (taskData, userId, callback) => {
        const query = `INSERT INTO tasks (title, description, executeAt, status, userId) VALUES (?, ?, ?, 'Scheduled', ?)`;
        db.run(query, [taskData.title, taskData.description, taskData.executeAt, userId], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    findAllByUser: (userId, callback) => {
        const query = `SELECT * FROM tasks WHERE userId = ? ORDER BY executeAt ASC`;
        db.all(query, [userId], (err, rows) => callback(err, rows));
    },

    // Used by the background scheduler to find tasks that are due to execute
    findDueTasks: (callback) => {
        const query = `SELECT * FROM tasks WHERE status = 'Scheduled' AND executeAt <= datetime('now', 'localtime')`;
        db.all(query, [], (err, rows) => callback(err, rows));
    },

    updateStatus: (id, status, callback) => {
        const query = `UPDATE tasks SET status = ? WHERE id = ?`;
        db.run(query, [status, id], function(err) {
            callback(err, this ? this.changes : 0);
        });
    }
};