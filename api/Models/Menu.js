const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
    unique: true,
  },
  Items: [
    {
      name: String,
      price: Number,
      description: String,
      img: String,
    },
  ],
  img: String,
});

const MenuModel = mongoose.model("menu", MenuSchema);
module.exports = MenuModel;
