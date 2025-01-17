const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const db = require("./models/");
require("./config/db");
const app = express();

app.use(bodyParser.json());

(async () => {
  await db.syncDatabase();
})();

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
