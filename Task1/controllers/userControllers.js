import User from "../models/userModels.js";
import { asyncHandler } from "../utils/helpers.js";
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    });
};

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        return res.status(400).json({
            completed: false,
            message: 'User with this email or username already exists'
        });
    }

    const user = await User.create({
        username,
        email,
        password
    });

    const token = generateToken(user._id);

    res.status(201).json({
        completed: true,
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({
        completed: false,
        message: 'Invalid email or password'
        });
    }

    const token = generateToken(user._id);

    res.json({
        completed: true,
        message: 'Login successful',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token
    });
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().select('-password').skip(skip).limit(limit);
    const total = await User.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
        completed: true,
        users,
        pagination: {
            currentPage: page,
            totalPages,
            totalUsers: total,
            usersPerPage: limit,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    });
});