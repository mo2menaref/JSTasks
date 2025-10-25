import express from "express";
import { validateCreateTask, validateUpdateTask } from "../middleware/validations.js";

const router = express.Router();

import { 
    getAllTasks, 
    getTask, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../controllers/taskControllers.js";

router.get("/", getAllTasks);
router.get("/:id", getTask);

router.post("/", validateCreateTask, createTask);
router.put("/:id", validateUpdateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;