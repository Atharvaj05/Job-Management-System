import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'super_fallback_secret_key_change_me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    databaseUrl: process.env.DATABASE_URL || './database/jobs.db',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    saltRounds: 10
};