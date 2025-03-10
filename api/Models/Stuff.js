const mongoose = require("mongoose");

const StuffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cred: String,
  role: {
    type: String,
    required: true,
  },
  username: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
});

const StuffModel = mongoose.model("stuff", StuffSchema);
module.exports = StuffModel;
