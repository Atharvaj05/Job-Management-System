import db from '../database/db.js';

export const UserModel = {
    create: (name, email, passwordHash, callback) => {
        const query = `INSERT INTO users (name, email, passwordHash) VALUES (?, ?, ?)`;
        db.run(query, [name, email, passwordHash], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },
    findByEmail: (email, callback) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.get(query, [email], (err, row) => callback(err, row));
    },
    findById: (id, callback) => {
        const query = `SELECT id, name, email, createdAt FROM users WHERE id = ?`;
        db.get(query, [id], (err, row) => callback(err, row));
    }
};