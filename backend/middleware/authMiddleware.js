import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';

export const protectRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Missing token telemetry structure.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedPayload = jwt.verify(token, config.jwtSecret);
        // Bind the tenant identity directly to the Request context pipeline
        req.user = { id: decodedPayload.id, email: decodedPayload.email };
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token verification failed. Signature is corrupt or expired.' });
    }
};