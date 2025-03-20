const { bookSlot } = require("../Controler/bookingscon");
const { OrderStuff } = require("../Controler/stationarycon");
const { bookTicket } = require("../Controler/Theatercon");
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
voyroute.post("/book", bookSlot);
voyroute.post("/bookmov", bookTicket);

module.exports = voyroute;
