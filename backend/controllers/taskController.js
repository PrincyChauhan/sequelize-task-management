const { Task, SubTask } = require("../models");

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

const updateTaskWithSubtasks = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, assignedTo, subtasks } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    await task.update({
      title: title || task.title,
      description: description || task.description,
      dueDate: dueDate || task.dueDate,
      assignedTo: assignedTo || task.assignedTo,
    });
    if (Array.isArray(subtasks)) {
      await SubTask.destroy({ where: { taskId } });
      const subtasksToCreate = subtasks.map((subtask) => ({
        ...subtask,
        taskId,
      }));
      await SubTask.bulkCreate(subtasksToCreate);
    }
    const updatedTask = await Task.findByPk(taskId, {
      include: { model: SubTask, as: "subtasks" },
    });

    res.status(200).json({
      message: "Task updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: {
        model: SubTask,
        as: "subtasks",
      },
    });
    if (!tasks.length) {
      return res.status(404).json({
        message: "No tasks found.",
      });
    }
    res.status(200).json({
      message: "Tasks fetched successfully.",
      tasks,
    });
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getTaskbyId = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByPk(taskId, {
      include: {
        model: SubTask,
        as: "subtasks",
      },
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }
    res.status(200).json({
      message: "Task fetched successfully",
      task,
    });
  } catch (error) {
    console.error("Error getting task by id:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const deleteTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }
    task.isDeleted = true;
    task.deletedAt = new Date();
    await task.save();
    return res.status(200).json({
      message: "Task deleted successfully.",
      task,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
module.exports = {
  createTaskWithSubtasks,
  updateTaskWithSubtasks,
  getAllTasks,
  getTaskbyId,
  deleteTaskById,
};
