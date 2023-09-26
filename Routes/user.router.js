const express = require("express");
const router = express.Router();

const {
  showWelcome,
  registerUser,
  getAllUsers,
  deleteUser,
  SignIn,
  getDashboard,
} = require("../Controllers/user.controller");

router.get("/welcome", showWelcome);
router.post("/register", registerUser);
router.post("/delete/:email", deleteUser);
router.post("/edit/:email", deleteUser);
router.get("/alluser", getAllUsers);
router.post("/signIn", SignIn);
router.get("/dashboard", getDashboard);

module.exports = router;
