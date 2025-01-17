const sequelize = require("../config/db");
const User = require("./User");
const Task = require("./Task");
const SubTask = require("./SubTask");

const db = {
  sequelize,
  User,
  Task,
  SubTask,
};

db.syncDatabase = async () => {
  try {
    // await sequelize.sync({ alter: true });
    await sequelize.sync({});
    console.log("All tables synced successfully!");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};
module.exports = db;
