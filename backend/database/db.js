import sqlite3 from 'sqlite3';
import { config } from '../config/environment.js';

const db = new sqlite3.Database(config.databaseUrl, (err) => {
    if (err) console.error('Database connection crash:', err.message);
    else {
        db.run('PRAGMA foreign_keys = ON;');
        console.log('Connected to Scheduler DB engine instance.');
    }
});

export const initDB = () => {
    // Users table stays exactly the same as V1
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            passwordHash TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Tasks table: Tracks when a specific task is scheduled to run
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            executeAt DATETIME NOT NULL,
            status TEXT CHECK(status IN ('Scheduled', 'Running', 'Completed', 'Failed')) DEFAULT 'Scheduled',
            userId INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    // Execution logs table: Stores results of background execution attempts
    db.run(`
        CREATE TABLE IF NOT EXISTS execution_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskId INTEGER NOT NULL,
            startedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            completedAt DATETIME,
            result TEXT,
            errorMessage TEXT,
            FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE
        );
    `);
};

export default db;