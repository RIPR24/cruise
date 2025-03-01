const StationaryModel = require("../Models/Stationary.js");

const GetAllItems = async (req, res) => {
  const dat = await StationaryModel.find({});
  res.json(dat);
};

const CreateViaLink = async (req, res) => {
  const data = req.body;
  if (data.name && data.price) {
    const dat = await StationaryModel.create({
      name: data.name,
      price: data.price,
      tags: data.tags || [],
      description: data.description || "",
      img: data.description || "",
    });
    res.json({ status: "success", dat });
  } else {
    res.json({ status: "enter details properly" });
  }
};

const CreateViaImg = async (req, res) => {
  const data = req.body;
  if (data.name && data.price) {
    const dat = await StationaryModel.create({
      name: data.name,
      price: data.price,
      tags: data.tags || [],
      description: data.description || "",
      img: data.description || "",
    });
    res.json({ status: "success", dat });
  } else {
    res.json({ status: "enter details properly" });
  }
};
