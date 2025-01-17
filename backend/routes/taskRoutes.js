const express = require("express");
const taskController = require("../controllers/taskController");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/create-task", isAdmin, taskController.createTaskWithSubtasks);
module.exports = router;
