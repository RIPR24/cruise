const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
