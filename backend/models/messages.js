const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: [true, "Please Enter a Message"],
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
    required: true,
  },
});

messageSchema.methods.senderRoom = function () {
  return this.sender + this.receiver;
};

messageSchema.methods.receiverRoom = function () {
  return this.receiver + this.sender;
};

module.exports = mongoose.model("Messages", messageSchema);
