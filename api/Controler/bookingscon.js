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
    if (bk.length < slt.slots.max || 1) {
      const tim = new Date();
      const book = await BookingModel.create({ ...data, time: tim.toString() });
      res.json({ status: "success", book });
    } else {
      res.json({ status: "Slot already booked" });
    }
    res.json({ status: "Failed" });
  }
};

const getBookings = async (req, res) => {
  const { rsid, date } = req.body;
  const bk = await BookingModel.find({ date: date, rsid: rsid });
  res.json({ bk });
};
