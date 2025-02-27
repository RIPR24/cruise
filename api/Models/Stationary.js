const mongoose = require("mongoose");

const StationarySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  tags: [String],
  description: String,
  img: String,
});

const StationaryModel = mongoose.model("stationary", StationarySchema);
module.exports = StationaryModel;
