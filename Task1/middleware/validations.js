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