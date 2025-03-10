const StationaryModel = require("../Models/Stationary.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const OrderModel = require("../Models/Order.js");

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
  try {
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
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
  }
};

const CreateViaImg = async (req, res) => {
  const data = req.body;
  try {
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
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
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

const OrderStuff = async (req, res) => {
  const data = req.body;
  try {
    const tim = new Date();
    const ord = await OrderModel.create({ ...data, time: tim.to() });
    if (ord) res.json({ status: "success", code: 200, ord });
    else res.json({ status: "failed" });
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
  }
};

const getAllOrder = async (req, res) => {
  const food = req.body.food;
  const orders = await OrderModel.find({ food: food });
  res.json({ orders });
};
const getAllOrderUID = async (req, res) => {
  const { food, uid } = req.body.food;
  const orders = await OrderModel.find({ food, uid });
  res.json({ orders });
};

module.exports = {
  upload,
  GetAllItems,
  CreateViaLink,
  CreateViaImg,
  ModifySta,
  ModifyStaImg,
  OrderStuff,
  getAllOrder,
  getAllOrderUID,
};
