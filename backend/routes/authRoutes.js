const express = require("express");
const authcontroller = require("../controllers/authController");
const { isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/admin/signup", authcontroller.adminSignup);
router.post("/create-invite-user", isAdmin, authcontroller.createAndInviteUser);
router.post("/signin", authcontroller.signin);
router.get("/get-users", isAdmin, authcontroller.getAllUsers);

module.exports = router;
