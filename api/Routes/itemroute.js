const { getAllSta } = require("../Controler/stationarycon");

const itemroute = require("express").Router();

itemroute.post("/getsta", getAllSta);

module.exports = itemroute;
