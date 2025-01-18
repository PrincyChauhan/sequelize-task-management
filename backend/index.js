const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const db = require("./models/");
require("./config/db");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

(async () => {
  await db.syncDatabase();
})();

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
