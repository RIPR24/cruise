const { OrderStuff } = require("../Controler/stationarycon");
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

module.exports = voyroute;
