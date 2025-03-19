const SeatModel = require("../Models/MovieArr");

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

module.exports = { getTht, modTht };
