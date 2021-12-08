const express = require("express");
const {
  loginUser,
  registerUser,
  updateUsername,
  updatePassword,
  logout,
  addGroupChat,
  getUserData,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

let router = express.Router();

router.route("/login").get(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").get(isAuthenticatedUser, logout);

router.route("/update/username").put(isAuthenticatedUser, updateUsername);
router.route("/update/password").put(isAuthenticatedUser, updatePassword);

router.route("/addGroup").put(isAuthenticatedUser, addGroupChat);
router.route("/:id").get(isAuthenticatedUser, getUserData);

module.exports = router;
