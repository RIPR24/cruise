const SeatModel = require("../Models/MovieArr");
const MovBookModel = require("../Models/MovieBok");

const getTht = async (req, res) => {
  const st = await SeatModel.findOne();
  res.json(st);
};

const modTht = async (req, res) => {
  const dat = req.body;
  const st = await SeatModel.findOne();
  st.name = dat.name;
  st.seat = dat.seat;
  st.slots = dat.slots;
  st.price = dat.price;
  st.save();
  res.json({ st, status: "success" });
};

const bookicket = async (req, res) => {
  const dat = req.body;
  const booked = await MovBookModel.find({
    date: dat.date,
    sid: dat.sid,
  }).select("seat");
};

const getBooked = async (req, res) => {
  const dat = req.body;
  const booked = await MovBookModel.find({
    date: dat.date || "",
    sid: dat.sid || "",
  }).select("seat");
  res.json(booked);
};

module.exports = { getTht, modTht, getBooked };
