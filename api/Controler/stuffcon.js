const StuffModel = require("../Models/Stuff");
const { createHmac, randomBytes } = require("crypto");
require("dotenv").config();
const sid = new Map();
const retry = new Map();

const LoginStuff = async (req, res) => {
  const { username, password } = req.body;
  const ret = retry.get(username);
  if (ret && ret.time + ret.cd < Date.now()) {
    const rt = (Date.now() - (ret.time + ret.cd)) / 1000;
    res.json({ status: `Try again after ${rt}sec` });
  } else {
    const [user] = await StuffModel.find({ username: username });
    if (user && password) {
      const cpass = createHmac("sha256", process.env.KEY)
        .update(password)
        .digest("hex");
      if (cpass === user.password) {
        const token = randomBytes(32).toString("hex");
        sid.set(user.username, { tok: token, rol: user.role });
        if (ret) {
          retry.delete(username);
        }
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
        if (ret) {
          retry.set(username, { time: Date.now(), cd: ret.cd + 30000 });
        } else {
          retry.set(username, { time: Date.now(), cd: -30000 });
        }
        res.json({ status: "Wrong Password" });
      }
    } else {
      res.json({ status: "No User Found" });
    }
  }
};

const RegisterStuff = async (req, res) => {
  let dat = req.body;
  try {
    const us = await StuffModel.find({ username: dat.username });
    if (us.length > 0) {
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
  const { username, token, role } = req.body;
  const usr = sid.get(username);
  if (usr?.tok && usr.tok === token && role === usr.rol) {
    next();
  } else {
    res.json({ status: "unauthorised Access", code: 401 });
  }
};

module.exports = { LoginStuff, RegisterStuff, validateStuff };
