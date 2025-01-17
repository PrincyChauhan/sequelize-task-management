const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/");
require("./config/db");
const app = express();

app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Hello World");
});

(async () => {
  await db.syncDatabase();
})();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
