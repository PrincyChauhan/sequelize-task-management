const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const commonFields = require("./commonFields");

const Subtask = sequelize.define(
  "Subtask",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tasks",
        key: "id",
      },
      allowNull: false,
    },
    ...commonFields,
  },
  {
    tableName: "Subtasks",
  }
);

Subtask.associate = (models) => {
  Subtask.belongsTo(models.Task, {
    foreignKey: "taskId",
    as: "task",
  });
};

module.exports = Subtask;
