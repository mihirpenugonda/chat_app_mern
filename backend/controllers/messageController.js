const mongoose = require("mongoose");
const Messages = require("../models/messages");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");

exports.sendMessage = async (req, res, next) => {
  const { receiver, message } = req.body;
  const sender = req.user._id;

  const sentMessage = await Messages.create({
    message,
    sender,
    receiver,
  }).catch((err) => next(new ErrorHandler(401, "Error Sending Message")));

  res.status(200).json({ success: true, sentMessage });
};

exports.getMessages = async (req, res, next) => {
  const sender = req.user.id;
  const receiver = req.body.receiver;

  let messages = [];

  await Messages.find(
    {
      $or: [
        { $and: [{ sender: sender }, { receiver: receiver }] },
        { $and: [{ sender: receiver }, { receiver: sender }] },
      ],
    },
    (err, messagesList) => {
      if (err)
        return next(new ErrorHandler(401, "Error In Retrieving Messages"));
      messagesList.forEach((message) => {
        messages.push(message);
      });
    }
  )
    .clone()
    .catch((err) => {
      return next(new ErrorHandler(401, "Error In Retrieving Messages"));
    })
    .then((messages) => {
      res.status(200).json({ success: true, messages });
    });
};
