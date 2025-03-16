const mongoose = require("mongoose");

const ResSpotSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slots: [
    {
      from: String,
      to: String,
      price: Number,
      max: Number,
    },
  ],
});

const ResSpotModel = mongoose.model("res-spot", ResSpotSchema);
module.exports = ResSpotModel;
