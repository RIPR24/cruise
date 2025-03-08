const StationaryModel = require("../Models/Stationary.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "../uploads/statonary",
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

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
      img: `cruiseimg/statonary/${req.file.filename}`,
    });
    res.json({ status: "success", dat });
  } else {
    res.json({ status: "enter details properly" });
  }
};

const ModifySta = async (req, res) => {
  const data = req.body;
  let item = await StationaryModel.findById(data.uid);
  if (item) {
    item.name = data.name;
    item.description = data.description;
    item.price = data.price;
    await item.save();
    res.json({ status: "success", item });
  } else {
    res.json({ status: "enter details properly" });
  }
};

const ModifyStaImg = async (req, res) => {
  const data = req.body;
  let item = await StationaryModel.findById(data.uid);
  if (item) {
    if (item.img.substring(19, 25) === "stat_") {
      fs.unlink(`../upload/${item.img}`, (err) => {
        console.log(err);
      });
    }
    if (req.file.filename) {
      item.img = `cruiseimg/statonary/${req.file.filename}`;
    } else {
      item.img = data.img;
    }
    await item.save();
    res.json({ status: "success", item });
  } else {
    res.json({ status: "enter details properly" });
  }
};

module.exports = {
  upload,
  GetAllItems,
  CreateViaLink,
  CreateViaImg,
  ModifySta,
  ModifyStaImg,
};
