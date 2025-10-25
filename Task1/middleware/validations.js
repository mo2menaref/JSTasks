import { body, param, validationResult } from "express-validator";

export const validateCreateTask = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters"),
    
    body("description")
        .optional()
        .isLength({ max: 200 })
        .withMessage("Description cannot exceed 200 characters")
];

export const validateUpdateTask = [
    param("id")
        .isNumeric()
        .withMessage("ID must be a number"),
    
    body("title")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters"),
    
    body("description")
        .optional()
        .isLength({ max: 300 })
        .withMessage("Description cannot exceed 300 characters"),
    
    body("completed")
        .isBoolean()
        .withMessage("Completed must be true or false")
];