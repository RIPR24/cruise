const { LoginStuff, RegisterStuff } = require("../Controler/stuffcon");

const stuffroute = require("express").Router();

stuffroute.post("/login", LoginStuff);
stuffroute.post("/register", RegisterStuff);

module.exports = stuffroute;
