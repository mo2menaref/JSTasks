import mongoose from 'mongoose';

/**
 * @param {string} id - The ID to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

/**
 * @param {boolean} success - Whether the operation was successful
 * @param {string} message - Response message
 * @param {any} data - Response data
 * @returns {object} - Standardized response object
 */
export const createResponse = (success, message = '', data = null) => {
    const response = { completed: success };
    
    if (message) response.message = message;
    if (data) {
        if (Array.isArray(data)) {
            response.tasks = data;
        } else {
            response.task = data;
        }
    }
    return response;
};

/**
 * Handle async errors in routes
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function with error handling
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};