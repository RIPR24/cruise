const StuffModel = require("../Models/Stuff");
const { createHmac, randomBytes } = require("crypto");
require("dotenv").config();
const sid = new Map();

const LoginStuff = async (req, res) => {
  const { username, pass } = req.body;
  const user = StuffModel.findById(username);
  if (user) {
    const cpass = createHmac("sha256", process.env.KEY)
      .update(pass)
      .digest("hex");
    if (cpass === user.password) {
      const token = randomBytes(32).toString("hex");
      sid.set(user.username, token);
      res.json({
        status: "success",
        user: {
          username: user.username,
          name: user.name,
          role: user.role,
          token,
        },
      });
    } else {
      res.json({ status: "Wrong Password" });
    }
  } else {
    res.json({ status: "No User Found" });
  }
};

const RegisterStuff = async (req, res) => {
  let dat = req.body;
  try {
    if (await StuffModel.findById(dat.username)) {
      res.json({ status: "User already exist" });
    } else {
      dat.password = createHmac("sha256", process.env.KEY)
        .update(dat.password)
        .digest("hex");
      const user = await StuffModel.create(dat);
      res.json({ status: "success", user });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
  }
};

const validateStuff = (req, res, next) => {
  const { username, token } = req.body;
  const tok = sid.get(username);
  if (tok && tok === token) {
    next();
  } else {
    res.json({ status: "unauthorised Access", code: 501 });
  }
};

module.exports = { LoginStuff, RegisterStuff, validateStuff };
