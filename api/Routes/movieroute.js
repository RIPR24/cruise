const { getTht } = require("../Controler/Theater");

const movieroute = require("express").Router();

movieroute.get("/seat", getTht);

module.exports = movieroute;
