const Groups = require("../models/groups");
const ErrorHandler = require("../utils/errorHandler");
const GroupMessage = require("../models/groupMessage");

exports.createNewGroup = async (req, res, next) => {
  const { name, description } = req.body;
  const creator = req.body._id;

  const group = await Groups.create({
    name,
    description,
    creator,
  }).catch((err) => {
    return next(new ErrorHandler(401, "Error In Creating Group"));
  });

  res.status(200).json(group);
};

exports.addUser = async (req, res, next) => {
  const id = req.user._id;
  const groupId = req.params.id;

  const message = await Groups.findOneAndUpdate(
    { _id: groupId },
    { $push: { members: id } },
    { new: true }
  );

  res.status(200).json(message);
};

exports.banUser = async (req, res, next) => {
  const id = req.user._id;
  const groupId = req.params.id;

  const message = await Groups.findOneAndUpdate(
    { _id: groupId },
    { $push: { banned: id } },
    { new: true }
  );

  res.status(200).json(message);
};

exports.sendGroupMessage = async (req, res, next) => {
  const message = req.body.message;
  //   const sender = req.user._id;
  const group = req.params.id;

  const sender = "61af838f35d8cd3bba6697c7";

  const newMessage = new GroupMessage({
    message: message,
    sender: sender,
  });

  await Groups.findOneAndUpdate(
    { _id: group },
    { $push: { messages: newMessage } }
  ).catch((err) => {
    return next(new ErrorHandler(401, "Group Not Found"));
  });

  res.status(200).json("Message Sent");
};

exports.getGroupMessages = async (req, res, next) => {
  const id = req.params.id;

  await Groups.findOne({ _id: id }, (err, group_data) => {
    if (err) return next(new ErrorHandler(404, "Error In Retrieving Messages"));
    res.status(200).json(group_data.messages);
  })
    .clone()
    .catch((err) => {
      return next(new ErrorHandler(404, "Error In Retrieving Messages"));
    });
};
