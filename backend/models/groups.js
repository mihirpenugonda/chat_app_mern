const mongoose = require("mongoose");
const groupMessageSchema = require("./groupMessage").schema;

const groupSchema = mongoose.Schema({
  name: { type: String, require: [true, "Please Enter Group Name"] },
  description: { type: String, default: "Enter Group Description" },
  createdAt: { type: Date, default: Date.now() },
  creator: { type: mongoose.Schema.ObjectId, required: [true] },
  members: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    default: [],
  },
  banned: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    default: [],
  },
  messages: {
    type: [groupMessageSchema],
  },
});

module.exports = mongoose.model("group", groupSchema);
// module.exports = groupMessageSchema;
