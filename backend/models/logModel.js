import db from '../database/db.js';

export const LogModel = {
    createEntry: (taskId, callback) => {
        const query = `INSERT INTO execution_logs (taskId, startedAt) VALUES (?, datetime('now', 'localtime'))`;
        db.run(query, [taskId], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    completeEntry: (logId, result, callback) => {
        const query = `UPDATE execution_logs SET completedAt = datetime('now', 'localtime'), result = ? WHERE id = ?`;
        db.run(query, [result, logId], (err) => callback(err));
    },

    failEntry: (logId, errorMsg, callback) => {
        const query = `UPDATE execution_logs SET completedAt = datetime('now', 'localtime'), errorMessage = ? WHERE id = ?`;
        db.run(query, [errorMsg, logId], (err) => callback(err));
    },

    getLogsByTask: (taskId, userId, callback) => {
        const query = `
            SELECT el.* FROM execution_logs el
            JOIN tasks t ON el.taskId = t.id
            WHERE t.id = ? AND t.userId = ?
            ORDER BY el.startedAt DESC
        `;
        db.all(query, [taskId, userId], (err, rows) => callback(err, rows));
    }
};