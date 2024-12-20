const Task = require("../models/Task");

// Fetch all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Fetch a single task by its ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  console.log("Received Request Body:", req.body); // Log the request body

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error saving task:", err.message, err); // Log the full error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: "Invalid task data", error: err.message });
    }
    res.status(400).json({ message: "Invalid task data", error: err.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
