const VoyagerModel = require("../Models/Voyager");
const { createHmac, createCipheriv, createDecipheriv } = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const LoginVoy = async (req, res) => {
  const { username, pass } = req.body;
  const user = VoyagerModel.findById(username);
  if (user) {
    const cpass = createHmac("sha256", process.env.KEY)
      .update(pass)
      .digest("hex");
    if (cpass === user.password) {
      const token = jwt.sign({ id: username }, process.env.ACCESS_TOKEN, {
        expiresIn: "48h",
      });
      res.json({
        status: "success",
        user: {
          _id: user._id,
          name: user.name,
          room: user.room,
          token: token,
        },
      });
    } else {
      res.json({ status: "Wrong Password" });
    }
  } else {
    res.json({ status: "No User Found" });
  }
};

const LogiViaTok = async (req, res) => {
  const { tok } = req.body;
  jwt.verify(tok, process.env.ACCESS_TOKEN, async (error, uid) => {
    if (err) {
      res.json({ status: "failed" });
    } else {
      const user = await VoyagerModel.findById(uid);
      if (user) {
        const token = jwt.sign({ id: username }, process.env.ACCESS_TOKEN, {
          expiresIn: "48h",
        });
        res.json({
          status: "success",
          user: {
            _id: user._id,
            name: user.name,
            room: user.room,
            token: token,
          },
        });
      } else {
        res.json({ status: "failed" });
      }
    }
  });
};

const RergisterVoy = async (req, res) => {
  let dat = req.body;
  try {
    if (await VoyagerModel.findById(dat._id)) {
      res.json({ status: "User already exist" });
    } else {
      let iv = dat._id + dat._id + dat._id + dat._id;
      iv = iv.substring(0, 16);
      const key = Buffer.from(process.env.EKEY, "hex");

      dat.password = createHmac("sha256", process.env.KEY)
        .update(dat.password)
        .digest("hex");
      const cipher = createCipheriv("aes-192-cbc", key, iv);
      let cred = cipher.update(dat.cred);
      cred += cipher.final("hex");
      dat.cred = cred;
      const cipher1 = createCipheriv("aes-192-cbc", key, iv);
      let ph = cipher1.update(dat.ph);
      ph += cipher1.final("hex");
      dat.ph = ph;
      if (dat.address) {
        const cipher2 = createCipheriv("aes-192-cbc", key, iv);
        let ad = cipher2.update(dat.address);
        ad += cipher2.final("hex");
        dat.address = ad;
      }
      const user = await VoyagerModel.create(dat);
      res.json({ status: "success", user });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", error });
  }
};

const GetVoyInfo = async (req, res) => {
  const { vid } = req.body;
  let dat = await VoyagerModel.findById(vid);
  if (dat) {
    let iv = dat._id + dat._id + dat._id + dat._id;
    iv = iv.substring(0, 16);
    const key = Buffer.from(process.env.EKEY, "hex");
    const decipher = createDecipheriv("aes-192-cbc", key, iv);
    let ph = decipher.update(dat.ph, "hex", "utf-8");
    ph += decipher.final("utf-8");
    dat.ph = ph;
    const decipher1 = createDecipheriv("aes-192-cbc", key, iv);
    let cred = decipher1.update(dat.cred, "hex", "utf-8");
    cred += decipher1.final("utf-8");
    dat.cred = cred;
    const decipher2 = createDecipheriv("aes-192-cbc", key, iv);
    let address = decipher2.update(dat.address, "hex", "utf-8");
    address += decipher2.final("utf-8");
    dat.address = address;
    res.json({ status: "success", user: dat });
  } else {
    res.json({ status: "no user found" });
  }
};

const GetAllVoy = async (req, res) => {
  let dat = await VoyagerModel.find({});
  dat = dat.map((el) => {
    let iv = el._id + el._id + el._id + el._id;
    iv = iv.substring(0, 16);
    const decipher = createDecipheriv(
      "aes-192-cbc",
      Buffer.from(process.env.EKEY, "hex"),
      iv
    );
    let ph = decipher.update(el.ph, "hex", "utf-8");
    ph += decipher.final("utf-8");
    el.ph = ph;
    return el;
  });
  res.json(dat);
};

module.exports = { LoginVoy, LogiViaTok, RergisterVoy, GetVoyInfo, GetAllVoy };
