const { getRc } = require("../Controler/reservationSpotcon");

const rsroute = require("express").Router();

rsroute.get("/", getRc);

module.exports = rsroute;
