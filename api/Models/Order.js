const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  food: { required: true, type: Boolean },
  items: [{ name: String, qnt: Number, price: Number, _id: String }],
  time: String,
  status: String,
  total: Number,
  user_Name: String,
  room: String,
  uid: { type: String, required: true },
});

const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;
