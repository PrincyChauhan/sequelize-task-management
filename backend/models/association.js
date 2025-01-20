const User = require("./User");
const SubTask = require("./SubTask");
const Task = require("./Task");

module.exports = (models) => {
  Task.hasMany(SubTask, {
    foreignKey: "taskId",
    as: "subtasks",
  });
  Task.belongsTo(User, {
    foreignKey: "assignedTo",
    as: "assignedToUser",
  });

  Task.belongsTo(User, {
    foreignKey: "createdBy",
    as: "taskCreatedBy",
  });

  SubTask.belongsTo(Task, {
    foreignKey: "taskId",
    as: "task",
  });
  User.hasMany(Task, { as: "assignedTasks", foreignKey: "assignedTo" });
  User.hasMany(Task, { as: "createdTasks", foreignKey: "createdBy" });
};
