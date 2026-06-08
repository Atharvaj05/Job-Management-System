import sqlite3 from 'sqlite3';
import { config } from '../config/environment.js';

const db = new sqlite3.Database(config.databaseUrl, (err) => {
    if (err) console.error('Database connection crash:', err.message);
    else {
        // Force foreign key enforcement inside the SQLite engine instance
        db.run('PRAGMA foreign_keys = ON;', (pragmaErr) => {
            if (pragmaErr) console.error('Failed to enforce Foreign Keys');
        });
        console.log('Connected to the multi-user database instance.');
    }
});

export const initDB = () => {
    // 1. Users Table Blueprint
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            passwordHash TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // 2. Jobs Table Blueprint (Migrated with explicit User binding constraints)
    db.run(`
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT CHECK(status IN ('Pending', 'In Progress', 'Completed', 'Failed')) DEFAULT 'Pending',
            userId INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
};

export default db;