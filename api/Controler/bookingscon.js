const BookingModel = require("../Models/Bookings");
const ResSpotModel = require("../Models/ReservationSpots");
const VoyagerModel = require("../Models/Voyager");

const bookSlot = async (req, res) => {
  const data = req.body;
  const usr = await VoyagerModel.findById(data.uid);
  const slt = await ResSpotModel.findById(data.rsid);
  if (usr && slt) {
    const bk = await BookingModel.find({
      date: data.date,
      sid: data.sid,
      rsid: data.rsid,
    });
    if (bk.some((e) => e.uid === data.uid)) {
      res.json({ status: "You already booked that slot" });
    } else if (
      bk.length <
      (bk.length, slt.slots.find((el) => el.sid === data.sid).max || 1)
    ) {
      const tim = new Date();
      const book = await BookingModel.create({ ...data, time: tim.toString() });
      res.json({ status: "success", book });
    } else {
      res.json({ status: "Slot already booked" });
    }
  } else {
    res.json({ status: "Failed" });
  }
};

const getRsBooked = async (req, res) => {
  const { rsid, date } = req.body;
  const rb = await BookingModel.aggregate([
    { $match: { date, rsid } },
    { $group: { _id: "$sid", no: { $sum: 1 } } },
  ]);
  res.json({ rb });
};

const getBookings = async (req, res) => {
  const { rsid, date } = req.body;
  const bk = await BookingModel.find({ date: date, rsid: rsid }).sort("slot");
  res.json({ bk });
};

const getVoyBookings = async (req, res) => {
  const { uid } = req.body;
  const bk = await BookingModel.find({ uid: uid }).sort("slot");
  res.json({ bk });
};

module.exports = { bookSlot, getBookings, getVoyBookings, getRsBooked };
