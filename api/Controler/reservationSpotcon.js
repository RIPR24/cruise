const ResSpotModel = require("../Models/ReservationSpots");

const addResSpot = (req, res) => {
  try {
    const dat = req.body;
    const rs = ResSpotModel.create(dat);
    res.json({ status: "success", rs });
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
  }
};

const modifyResSlot = (req, res) => {
  const dat = req.body;
  const rs = ResSpotModel.findById(dat._id);
  if (rs) {
    rs.slots = dat.slots;
    rs.save();
    res.json({ status: "success", rs });
  } else {
    res.json({ status: "failed" });
  }
};
