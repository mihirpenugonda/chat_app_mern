const express = require("express");
const {
  sendMessage,
  getMessages,
  getGroupMessages
} = require("../controllers/messageController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = express.Router();

// send message to a user
router.route("/send").post(isAuthenticatedUser, sendMessage);
// get chat messages between two users
router.route("/get").get(isAuthenticatedUser, getMessages);

module.exports = router;
