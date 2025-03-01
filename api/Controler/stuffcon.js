const StuffModel = require("../Models/Stuff");
const { createHmac } = require("crypto");
require("dotenv").config();

const LoginStuff = async (req, res) => {
  const { username, pass } = req.body;
  const user = StuffModel.findById(username);
  if (user) {
    const cpass = createHmac("sha256", process.env.KEY)
      .update(pass)
      .digest("hex");
    if (cpass === user.password) {
      res.json({
        status: "success",
        user: {
          uid: user._id,
          name: user.name,
          room: user.room,
        },
      });
    } else {
      res.json({ status: "Wrong Password" });
    }
  } else {
    res.json({ status: "No User Found" });
  }
};

const RergisterStuff = async (req, res) => {
  let dat = req.body;
  if (await StuffModel.findById(dat.username)) {
    res.json({ status: "User already exist" });
  } else {
    dat.password = createHmac("sha256", process.env.KEY)
      .update(dat.password)
      .digest("hex");
    const user = await StuffModel.create(dat);
    res.json({ status: "success", user });
  }
};

module.exports = { LoginStuff, RergisterStuff };
