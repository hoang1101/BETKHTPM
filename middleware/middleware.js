const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const db = require("../models");

exports.verifyToken = (req, res, next) => {
  const token = req.get("Authorization");
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, User) => {
      if (err) {
        res.status(403).json("Token is not vilid");
      }
      req.User = User;
      //   console.log(User);
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};
exports.verifyTokenAdmin = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    console.log(req.User);
    const username_ = req.User.phone;
    const data = await db.User.findOne({
      where: { phone: username_ },
    });
    if (data.role === 1) {
      next();
    } else {
      res.status(403).json("You are not permission!");
    }
  });
};

exports.verifyTokenKinhDoang = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    console.log(req.User);
    const username_ = req.User.phone;
    const data = await db.User.findOne({
      where: { phone: username_ },
    });
    if (data.role === 2) {
      next();
    } else {
      res.status(403).json("You are not permission!");
    }
  });
};
exports.verifyTokenKho = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    console.log(req.User);
    const username_ = req.User.phone;
    const data = await db.User.findOne({
      where: { phone: username_ },
    });
    if (data.role === 3) {
      next();
    } else {
      res.status(403).json("You are not permission!");
    }
  });
};

exports.verifyTokenUser = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    console.log(req.User);
    const username_ = req.User.phone;
    const data = await db.User.findOne({
      where: { phone: username_ },
    });
    if (data) {
      next();
    } else {
      res.status(403).json("You are not permission!");
    }
  });
};
