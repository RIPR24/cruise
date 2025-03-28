const StationaryModel = require("../Models/Stationary.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const OrderModel = require("../Models/Order.js");

const storage = multer.diskStorage({
  destination: "./uploads/statonary",
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
        food: data.food,
        tags: data.tags || [],
        description: data.description || "",
        img: data.img || "",
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
        food: data.food === "true",
        tags: JSON.parse(data.tags) || [],
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
  let item = await StationaryModel.findById(data._id);
  if (item) {
    item.name = data.name;
    item.description = data.description;
    item.price = data.price;
    item.tags = data.tags;
    await item.save();
    res.json({ status: "success", item });
  } else {
    res.json({ status: "enter details properly" });
  }
};

const DeleteSta = async (req, res) => {
  try {
    const { _id } = req.body;
    let item = await StationaryModel.findById(_id);
    if (item) {
      if (item.img.substring(19, 25) === "stat_") {
        fs.unlink(`../upload/${item.img}`, (err) => {
          console.log(err);
        });
      }
      const status = await StationaryModel.findByIdAndDelete(_id);
      if (sta) {
        res.json({ status });
      } else {
        res.json({ status: "interesting" });
      }
      res.json({ status: "No item found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
  }
};

const ModifyStaImg = async (req, res) => {
  const data = req.body;
  let item = await StationaryModel.findById(data._id);
  if (item) {
    if (item.img.substring(19, 25) === "stat_") {
      fs.unlink(`../upload/${item.img}`, (err) => {
        console.log(err);
      });
    }
    item.img = `cruiseimg/statonary/${req.file.filename}`;
    await item.save();
    res.json({ status: "success", item });
  } else {
    res.json({ status: "enter details properly" });
  }
};

const ModifyStaLink = async (req, res) => {
  const data = req.body;
  let item = await StationaryModel.findById(data._id);
  if (item) {
    if (item.img.substring(19, 25) === "stat_") {
      fs.unlink(`../upload/${item.img}`, (err) => {
        console.log(err);
      });
    }
    item.img = data.img;
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
    const ord = await OrderModel.create({
      ...data,
      time: tim.toString(),
      status: "ordered",
    });
    if (ord) res.json({ status: "success", code: 200, ord });
    else res.json({ status: "failed" });
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
  }
};

const getAllSta = async (req, res) => {
  const food = req.body.food;
  const sta = await StationaryModel.find({ food: food });
  res.json({ sta });
};

const getAllOrder = async (req, res) => {
  const food = req.body.food;
  const orders = await OrderModel.find({ food: food });
  res.json({ orders });
};
const getAllOrderUID = async (req, res) => {
  const { food, uid } = req.body;
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
  DeleteSta,
  getAllSta,
  ModifyStaLink,
};
