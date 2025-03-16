const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  rsid: { type: String, required: true },
  uid: { type: String, required: true },
  cname: String,
  name: String,
  time: String,
  slot: String,
  date: String,
});

const BookingModel = mongoose.model("bookings", BookingSchema);
module.exports = BookingModel;
