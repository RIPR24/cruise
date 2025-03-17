const { modifyResSlot } = require("../Controler/reservationSpotcon");
const {
  CreateViaLink,
  CreateViaImg,
  upload,
  ModifySta,
  ModifyStaImg,
  DeleteSta,
} = require("../Controler/stationarycon");
const { validateStuff } = require("../Controler/stuffcon");
const { RergisterVoy, GetVoyInfo } = require("../Controler/voycon");

const adminroute = require("express").Router();

adminroute.post("/voyager", validateStuff, RergisterVoy);
adminroute.post("/sta", validateStuff, CreateViaLink);
adminroute.post("/voyinfo", validateStuff, GetVoyInfo);
adminroute.delete("/sta", validateStuff, DeleteSta);
adminroute.post("/staimg", upload.single("file"), validateStuff, CreateViaImg);
adminroute.put("/sta", validateStuff, ModifySta);
adminroute.put("/rs", validateStuff, modifyResSlot);
adminroute.put("/staimg", upload.single("file"), validateStuff, ModifyStaImg);

module.exports = adminroute;
