const {
  CreateViaLink,
  CreateViaImg,
  upload,
  ModifySta,
  ModifyStaImg,
} = require("../Controler/stationarycon");
const { validateStuff } = require("../Controler/stuffcon");
const { RergisterVoy } = require("../Controler/voycon");

const adminroute = require("express").Router();

adminroute.post("/regvoy", validateStuff, RergisterVoy);
adminroute.post("/addsta", validateStuff, CreateViaLink);
adminroute.post("/addstaimg", validateStuff, upload, CreateViaImg);
adminroute.post("/modsta", validateStuff, ModifySta);
adminroute.post("/modstaimg", validateStuff, upload, ModifyStaImg);

module.exports = adminroute;
