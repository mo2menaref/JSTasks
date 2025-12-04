import { body, param, validationResult } from "express-validator";
import { isValidObjectId } from "../utils/helpers.js";

export const validateCreateTask = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),
    
    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                completed: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
];

export const validateUpdateTask = [
    param("id")
        .custom((value) => {
            if (!isValidObjectId(value)) {
                throw new Error('Invalid task ID format');
            }
            return true;
        }),
    
    body("title")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),
    
    body("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
    
    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be true or false"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                completed: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
];

export const validateUserRegistration = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters")
        .isLength({ max: 30 })
        .withMessage("Username cannot exceed 30 characters"),
    
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address"),
    
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                completed: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
];

export const validateUserLogin = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address"),
    
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                completed: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }
        next();
    }
];