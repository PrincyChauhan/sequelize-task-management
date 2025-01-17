const { Task, SubTask, User } = require("../models");

const createTaskWithSubtasks = async (req, res) => {
  const { title, description, dueDate, assignedTo, subtasks } = req.body;
  if (!title || !description || !dueDate || !assignedTo || !subtasks) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      createdBy: req.user.userId,
    });
    let createdSubtasks = [];
    if (subtasks && Array.isArray(subtasks)) {
      for (let subtask of subtasks) {
        const newSubtask = await SubTask.create({
          title: subtask.title,
          description: subtask.description,
          taskId: newTask.id,
        });
        createdSubtasks.push(newSubtask);
      }
    }
    res.status(201).json({
      message: "Task created successfully with subtasks.",
      task: {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        assignedTo: newTask.assignedTo,
        createdBy: newTask.createdBy,
        subtasks: createdSubtasks,
      },
    });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createTaskWithSubtasks,
};
