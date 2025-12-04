import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/helpers.js';
import User from '../models/userModels.js';

// Middleware to verify JWT token
export const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            completed: false,
            message: 'Access denied. No valid token provided.'
        });
    }

    const token = authHeader.substring(7); 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                completed: false,
                message: 'Invalid token. User not found.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            completed: false,
            message: 'Invalid token.'
        });
    }
});

export const requireAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            completed: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
    next();
});