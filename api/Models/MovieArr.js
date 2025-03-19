const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  name: String,
  seat: [{ no: Number, char: String }],
  slots: [{ from: String, to: String, sid: String }],
  price: Number,
});

const SeatModel = mongoose.model("seat", SeatSchema);
module.exports = SeatModel;
