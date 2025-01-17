const express = require("express");
const authcontroller = require("../controllers/authController");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/admin/signup", authcontroller, adminSignup);
router.post("/user/create", isAdmin, authcontroller.createUser);
module.exports = router;
