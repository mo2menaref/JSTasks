import tasks from "../models/taskModels.js";

export const getAllTasks = (req, res) => {
    res.json({ completed: true, tasks });
};

export const getTask = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id == id);
    
    if (!task) {
        return res.json({ completed: false, message: "Task not found" });
    }
    
    res.json({ completed: true, task });
};

export const createTask = (req, res) => {
    const { title, description } = req.body;
    
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title,
        description: description || null,
        completed: false
    };
    
    tasks.push(newTask);
    res.json({ completed: true, task: newTask });
};

export const updateTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id == id);
    
    if (taskIndex === -1) {
        return res.json({ completed: false, message: "Task not found" });
    }
    
    const { title, description, completed } = req.body;
    
    if (title) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    
    res.json({ completed: true, task: tasks[taskIndex] });
};

export const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id == id);
    
    if (taskIndex === -1) {
        return res.json({ completed: false, message: "Task not found" });
    }
    
    tasks.splice(taskIndex, 1);
    res.json({ completed: true, message: "Task deleted successfully" });
};