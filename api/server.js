const express = require("express");
const app = express();
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

connect(process.env.MD_URI);
app.listen(process.env.PORT || 8080, () => {
  console.log("this runs");
});
app.use(cors({ origin: process.env.FRONT }));
app.use("/cruiseimg", express.static("./uploads/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/dummy", (req, res) => {
  dat = req.body;
  res.json({ ...dat, suc: "success" });
});
