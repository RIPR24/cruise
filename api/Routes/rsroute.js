const { getRsBooked } = require("../Controler/bookingscon");
const { getRc } = require("../Controler/reservationSpotcon");

const rsroute = require("express").Router();

rsroute.get("/", getRc);
rsroute.post("/booked", getRsBooked);

module.exports = rsroute;
