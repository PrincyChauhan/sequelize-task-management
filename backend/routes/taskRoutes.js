const express = require("express");
const taskController = require("../controllers/taskController");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-task", isAdmin, taskController.createTaskWithSubtasks);
router.post(
  "/update-task/:taskId",
  isAdmin,
  taskController.updateTaskWithSubtasks
);
router.get("/get-tasks", isAdmin, taskController.getAllTasks);
router.get("/get-task/:taskId", isAdmin, taskController.getTaskbyId);
router.delete("/delete-task/:taskId", isAdmin, taskController.deleteTaskById);
router.post("/update-task-status", isAdmin, taskController.updateTaskStatus);
module.exports = router;
