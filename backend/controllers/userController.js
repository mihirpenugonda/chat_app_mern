const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/jwtToken");

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!username || !password) {
    return next(new ErrorHandler(400, "Enter Both Fields"));
  }
  if (!user) {
    return next(new ErrorHandler(404, "User Not Found"));
  }

  let isPasswordCorrect = false;

  if (password === user.password) isPasswordCorrect = true;

  if (isPasswordCorrect) {
    sendToken(user, 200, res);
  } else {
    return next(new ErrorHandler(400, "Incorrect Password"));
  }
};

exports.registerUser = async (req, res, next) => {
  const { name, username, password } = req.body;

  const findUser = await User.findOne({ username });

  if (findUser) return next(new ErrorHandler(400, "User Already Exists"));

  const user = await User.create({
    name: name,
    username: username,
    password: password,
  }).catch((err) => {
    return next(new ErrorHandler(400, "User Not Created"));
  });

  sendToken(user, 200, res);
};

exports.updateUsername = async (req, res, next) => {
  const { username, newUsername } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return next(new ErrorHandler(404, "User Not Found"));
  }

  const newUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { username: newUsername } },
    { new: true }
  );

  res.status(200).json({
    success: true,
  });
};

exports.updatePassword = async (req, res, next) => {
  const { username, password, newPassword } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return next(new ErrorHandler(404, "User Not Found"));
  }

  const newUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: { password: newPassword } },
    { new: true }
  );

  res.status(200).json({
    success: true,
  });
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    user: req.user.name,
    message: "Logged Out",
  });
};

exports.addGroupChat = async (req, res, next) => {
  const { groupId } = req.body;

  const addGroup = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { group_chats: groupId } },
    { new: true }
  );

  res.status(200).json(groupId);
};

exports.getUserData = async (req, res, next) => {
  const request = req.params.id;

  const user = await User.findOne({ _id: request });
  if (!user) return next(new ErrorHandler(404, "User Not Found"));

  res.status(200).json(user);
};
