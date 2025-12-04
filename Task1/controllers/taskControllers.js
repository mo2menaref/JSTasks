import Task from "../models/taskModels.js";
import { asyncHandler } from "../utils/helpers.js";

export const getAllTasks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Only get tasks belonging to the authenticated user
    const tasks = await Task.find({ user: req.user._id }).skip(skip).limit(limit).populate('user', 'username email');
    const total = await Task.countDocuments({ user: req.user._id });
    const totalPages = Math.ceil(total / limit);

    res.json({
        completed: true,
        tasks,
        pagination: {
            currentPage: page,
            totalPages,
            totalTasks: total,
            tasksPerPage: limit,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    });
});

export const getTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user._id }).populate('user', 'username email');
    
    if (!task) {
        return res.status(404).json({ completed: false, message: "Task not found" });
    }
    
    res.json({ completed: true, task });
});

export const createTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    
    const newTask = new Task({
        title,
        description: description || null,
        user: req.user._id
    });
    
    const savedTask = await newTask.save();
    await savedTask.populate('user', 'username email');
    res.status(201).json({ completed: true, task: savedTask });
});

export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const updatedTask = await Task.findOneAndUpdate(
        { _id: id, user: req.user._id },
        { title, description, completed },
        { new: true, runValidators: true }
    ).populate('user', 'username email');
    
    if (!updatedTask) {
        return res.status(404).json({ completed: false, message: "Task not found" });
    }
    
    res.json({ completed: true, task: updatedTask });
});

export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    
    if (!deletedTask) {
        return res.status(404).json({ completed: false, message: "Task not found" });
    }
    
    res.json({ completed: true, message: "Task deleted successfully" });
});