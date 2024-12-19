const express = require("express");
const {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const { protect } = require("../middelwares/authMiddleware"); // Add protect middleware

const router = express.Router();

// Protect all task routes
router.get("/", protect, getTasks);
router.get("/:id", protect, getTasksById);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
