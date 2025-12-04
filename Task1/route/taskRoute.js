import express from "express";
import { validateCreateTask, validateUpdateTask } from "../middleware/validations.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

import { 
    getAllTasks, 
    getTask, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../controllers/taskControllers.js";

// All task routes require authentication
router.get("/", authenticate, getAllTasks);
router.get("/:id", authenticate, getTask);

router.post("/", authenticate, validateCreateTask, createTask);
router.put("/:id", authenticate, validateUpdateTask, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;