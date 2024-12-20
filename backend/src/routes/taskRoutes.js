const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksById,
} = require("../controllers/taskControllers");

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTasksById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
