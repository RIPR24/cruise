const mongoose = require("mongoose");

const VoySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    _id: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    room: String,
    address: String,
    credType: String,
    cred: String,
    ph: Number,
  },
  { _id: false }
);

const VoyagerModel = mongoose.model("voyager", VoySchema);
module.exports = VoyagerModel;
