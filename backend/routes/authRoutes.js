import express from 'express';
import * as AuthController from '../controllers/authController.js';
import * as Valid from '../validators/inputValidator.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', Valid.validateRegistration, AuthController.register);
router.post('/login', Valid.validateLogin, AuthController.login);
router.get('/profile', protectRoute, AuthController.getProfile);

export default router;