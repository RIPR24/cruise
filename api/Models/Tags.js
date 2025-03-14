const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  food: { type: Boolean, required: true },
  tags: [String],
});

const TagsModel = mongoose.model("menu", TagSchema);
module.exports = TagsModel;
