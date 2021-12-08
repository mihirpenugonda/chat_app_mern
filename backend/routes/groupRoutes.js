const express = require("express");
const {
  createNewGroup,
  addUser,
  banUser,
  sendGroupMessage,
  getGroupMessages,
} = require("../controllers/groupController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");

const router = express.Router();

// create new group with authenticated user as creator
router.route("/new").post(isAuthenticatedUser, createNewGroup);

// :id identifies the specific group
// add new user to a group
router.route("/:id/add").put(isAuthenticatedUser, addUser);
// ban user from group
router.route("/:id/ban").put(isAuthenticatedUser, banUser);
// send message to group
router.route("/:id/send").put(isAuthenticatedUser, sendGroupMessage);
// get messages from a particular group
router.route("/:id/get").get(getGroupMessages);
// update name or description of the group
router.route("/:id/update")

module.exports = router;
