const { getTht, getBooked } = require("../Controler/Theatercon");

const movieroute = require("express").Router();

movieroute.get("/seat", getTht);
movieroute.post("/booked", getBooked);

module.exports = movieroute;
