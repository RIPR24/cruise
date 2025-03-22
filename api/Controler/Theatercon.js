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

const bookTicket = async (req, res) => {
  try {
    const dat = req.body;
    const booked = await MovBookModel.findOne({
      date: dat.date,
      sid: dat.sid,
      seat: dat.seat,
    });
    if (booked) {
      res.json({ status: "Seat already booked", code: 403 });
    } else {
      const tim = new Date();
      const bok = await MovBookModel.create({ ...dat, time: tim.toString() });
      res.json({ status: "success", bok });
    }
  } catch (error) {
    console.log(error);
  }
};

const getBooked = async (req, res) => {
  const dat = req.body;
  const booked = await MovBookModel.find({
    date: dat.date || "",
    sid: dat.sid || "",
  }).select("seat");
  res.json(booked.map((el) => el.seat));
};

const getAllBooked = async (req, res) => {
  const dat = req.body;
  const booked = await MovBookModel.find({
    date: dat.date || "",
    sid: dat.sid || "",
  });
  res.json({ status: "success", booked });
};

const getVoyBooked = async (req, res) => {
  const { uid } = req.body;
  const booked = await MovBookModel.find({ uid });
  res.json({ status: "success", booked });
};

module.exports = {
  getTht,
  modTht,
  getBooked,
  bookTicket,
  getAllBooked,
  getVoyBooked,
};
