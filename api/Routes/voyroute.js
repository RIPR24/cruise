const { bookSlot, getVoyBookings } = require("../Controler/bookingscon");
const { OrderStuff, getAllOrderUID } = require("../Controler/stationarycon");
const { bookTicket, getVoyBooked } = require("../Controler/Theatercon");
const {
  LoginVoy,
  LogiViaTok,
  RergisterVoy,
  GetAllVoy,
} = require("../Controler/voycon");

const voyroute = require("express").Router();

voyroute.post("/login", LoginVoy);
voyroute.post("/logintok", LogiViaTok);
voyroute.post("/register", RergisterVoy);
voyroute.get("/all", GetAllVoy);
voyroute.post("/order", OrderStuff);
voyroute.post("/myorders", getAllOrderUID);
voyroute.post("/book", bookSlot);
voyroute.post("/bookmov", bookTicket);
voyroute.post("/tickets", getVoyBooked);
voyroute.post("/reservation", getVoyBookings);

module.exports = voyroute;
