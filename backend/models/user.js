const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please Enter Name"] },
  username: { type: String, required: [true, "Please Enter Username"] },
  password: { type: String, required: [true, "Please Enter Password"] },
  createdAt: { type: Date,required: [true, "Enter Created At Date"]  ,default: Date.now() },
  group_chats: [String],
  token: { type: String },
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
};

module.exports = mongoose.model("Users", userSchema);
