import { AuthService } from '../services/authService.js';
import { UserModel } from '../models/userModel.js';

export const register = async (req, res, next) => {
    try {
        const user = await AuthService.registerUser(req.body);
        res.status(201).json(user);
    } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
    try {
        const result = await AuthService.loginUser(req.body);
        res.status(200).json(result);
    } catch (err) { next(err); }
};

export const getProfile = (req, res, next) => {
    UserModel.findById(req.user.id, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).json({ error: 'User cluster profile missing.' });
        res.status(200).json(user);
    });
};