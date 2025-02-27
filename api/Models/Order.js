const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  food: { required: true, type: Boolean },
  items: [{ name: String, price: Number }],
  total: Number,
  userName: String,
  uid: { type: String, required: true },
});

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;
