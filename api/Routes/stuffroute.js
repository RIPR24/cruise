const { getBookings } = require("../Controler/bookingscon");
const { getAllOrder } = require("../Controler/stationarycon");
const {
  LoginStuff,
  RegisterStuff,
  validateStuff,
} = require("../Controler/stuffcon");
const { getAllBooked } = require("../Controler/Theatercon");

const stuffroute = require("express").Router();

stuffroute.post("/login", LoginStuff);
stuffroute.post("/register", RegisterStuff);
stuffroute.post("/orders", validateStuff, getAllOrder);
stuffroute.post("/bookings", validateStuff, getBookings);
stuffroute.post("/bookingsmov", validateStuff, getAllBooked);

module.exports = stuffroute;
