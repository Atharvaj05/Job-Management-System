import db from '../database/db.js';

export const JobModel = {
    create: (jobData, userId, callback) => {
        const query = `INSERT INTO jobs (title, description, status, userId) VALUES (?, ?, ?, ?)`;
        db.run(query, [jobData.title, jobData.description, jobData.status || 'Pending', userId], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },
    findAllByUser: (userId, callback) => {
        const query = `SELECT * FROM jobs WHERE userId = ? ORDER BY createdAt DESC`;
        db.all(query, [userId], (err, rows) => callback(err, rows));
    },
    findByIdAndUser: (id, userId, callback) => {
        const query = `SELECT * FROM jobs WHERE id = ? AND userId = ?`;
        db.get(query, [id, userId], (err, row) => callback(err, row));
    },
    updateByUser: (id, userId, jobData, callback) => {
        const query = `
            UPDATE jobs 
            SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP 
            WHERE id = ? AND userId = ?
        `;
        db.run(query, [jobData.title, jobData.description, jobData.status, id, userId], function(err) {
            callback(err, this ? this.changes : 0);
        });
    },
    deleteByUser: (id, userId, callback) => {
        const query = `DELETE FROM jobs WHERE id = ? AND userId = ?`;
        db.run(query, [id, userId], function(err) {
            callback(err, this ? this.changes : 0);
        });
    }
};