const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const commonFields = require("./commonFields");
const Task = require("./Task");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "admin",
    },
    isInvited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    invitedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: true,
    },
    ...commonFields,
  },
  {
    timestamps: true,
  }
);
module.exports = User;
