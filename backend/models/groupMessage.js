const mongoose = require("mongoose");

const groupMessageSchema = mongoose.Schema({
    message: {
      type: String,
      required: [true, "Please Enter a Message"],
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  module.exports = mongoose.model("groupMessage", groupMessageSchema);