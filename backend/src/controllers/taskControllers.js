const Task = require("../models/Task");

// Fetch all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // Filter by user ID
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a single task by ID for the logged-in user
const getTasksById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id }); // Match task ID and user ID
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new task for the logged-in user
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
      user: req.user.id, // Assign the task to the logged-in user
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Invalid task data" });
  }
};

// Update a task if it belongs to the logged-in user
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Match task ID and user ID
      req.body,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task if it belongs to the logged-in user
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // Match task ID and user ID
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTasks, getTasksById, createTask, updateTask, deleteTask };
