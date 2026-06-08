import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
import { config } from '../config/environment.js';

export const AuthService = {
    registerUser: ({ name, email, password }) => {
        return new Promise((resolve, reject) => {
            UserModel.findByEmail(email, async (err, existingUser) => {
                if (err) return reject(err);
                if (existingUser) return reject(new Error('Email identity signature already registered.'));

                try {
                    const hash = await bcrypt.hash(password, config.saltRounds);
                    UserModel.create(name, email, hash, (createErr, insertId) => {
                        if (createErr) return reject(createErr);
                        resolve({ id: insertId, name, email });
                    });
                } catch (hashErr) { reject(hashErr); }
            });
        });
    },

    loginUser: ({ email, password }) => {
        return new Promise((resolve, reject) => {
            UserModel.findByEmail(email, async (err, user) => {
                if (err) return reject(err);
                if (!user) return reject(new Error('Invalid authorization profile matches.'));

                const match = await bcrypt.compare(password, user.passwordHash);
                if (!match) return reject(new Error('Invalid authorization profile matches.'));

                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    config.jwtSecret,
                    { expiresIn: config.jwtExpiresIn }
                );
                resolve({ token, user: { id: user.id, name: user.name, email: user.email } });
            });
        });
    }
};