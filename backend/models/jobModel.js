import db from '../database/db.js';

// The Model Layer completely abstracts raw SQL commands away from business logic.
export const JobModel = {
    create: (jobData, callback) => {
        const query = `INSERT INTO jobs (title, description, status) VALUES (?, ?, ?)`;
        const params = [jobData.title, jobData.description, jobData.status || 'Pending'];
        db.run(query, function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    findAll: (callback) => {
        const query = `SELECT * FROM jobs ORDER BY createdAt DESC`;
        db.all(query, [], (err, rows) => callback(err, rows));
    },

    findById: (id, callback) => {
        const query = `SELECT * FROM jobs WHERE id = ?`;
        db.get(query, [id], (err, row) => callback(err, row));
    },

    update: (id, jobData, callback) => {
        const query = `
            UPDATE jobs 
            SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP 
            WHERE id = ?
        `;
        const params = [jobData.title, jobData.description, jobData.status, id];
        db.run(query, params, function(err) {
            callback(err, this ? this.changes : 0);
        });
    },

    delete: (id, callback) => {
        const query = `DELETE FROM jobs WHERE id = ?`;
        db.run(query, [id], function(err) {
            callback(err, this ? this.changes : 0);
        });
    }
};\n