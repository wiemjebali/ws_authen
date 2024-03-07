const express = require("express");
const router = express.Router();
const User = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../Middleware/isAuth")

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      res.send({ msg: "Existed user" });
    } else {
      const newUser = new User({
        fullName,
        email,
        password,
      });
      const saltRounds = 10;
      const cryptedPassword = await bcrypt.hash(password, saltRounds);
      newUser.password = cryptedPassword;
      await newUser.save();
      const payload = {
        id: newUser._id,
      };
      const token = await jwt.sign(payload, "jhvbekvbkeubv", {
        expiresIn: "24h",
      });
      res.send({ msg: "user created !", newUser, token });
    }
  } catch (err) {
    console.error(err, "server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send({ msg: "user not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send({ msg: "Bad password" });
      } else {
        const payload = {
          id: user._id,
        };
        const token = await jwt.sign(payload, "jhvbekvbkeubv", {
          expiresIn: "24h",
        });
        res.send({ msg: "User connected", user, token });
      }
    }
  } catch (err) {
    console.error(err, "server error");
  }
});

router.get("/isAuth", isAuth, async (req, res) => {
    res.send({user: req.user})
})

module.exports = router;
