const mongoose = require("mongoose");

const MovBookSchema = new mongoose.Schema({
  name: String,
  seat: String,
  sid: String,
  from: String,
  cname: String,
  uid: String,
  price: Number,
  date: String,
});

const MovBookModel = mongoose.model("mov_book", MovBookSchema);
module.exports = MovBookModel;
