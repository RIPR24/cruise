const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema(
  {
    _id: { unique: true, type: String, required: true },
    seat: [[{ no: Number, price: Number, style: String }]],
  },
  { _id: false }
);

const SeatModel = mongoose.model("seat", SeatSchema);
module.exports = SeatModel;
