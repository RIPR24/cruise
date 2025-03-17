const ResSpotModel = require("../Models/ReservationSpots");

const modifyResSlot = async (req, res) => {
  const dat = req.body;
  const rs = await ResSpotModel.findById(dat._id);
  if (rs) {
    rs.slots = dat.slots;
    rs.save();
    res.json({ status: "success", rs });
  } else {
    res.json({ status: "failed" });
  }
};

const getRc = async (req, res) => {
  const rcs = await ResSpotModel.find({});
  res.json({ rcs });
};

module.exports = { modifyResSlot, getRc };
