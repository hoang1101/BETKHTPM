const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { findOneUser } = require("../dao/customer.dao");
const { findOneStaff } = require("../dao/staff.dao");
const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));

exports.registerService = ({ phone, password, fullname, email, address }) =>
  new Promise(async (resolve, reject) => {
    try {
      // const column = await db.TaiKhoan.describe();

      // const x = Object.keys(column).pop();
      // console.log(x);
      const response = await db.Customer.findOrCreate({
        where: {
          phone,
        },
        defaults: {
          phone,
          password: hashPassword(password),
          fullname,
          email,
          phone,
          address,
        },
      });

      const token =
        response[1] &&
        jwt.sign(
          {
            phone: response[1].phone,
            password: response[1].password,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );
      resolve({
        error: token ? 0 : 2, // 0 thanh cong // 2 that bai
        msg: token
          ? "Register is successfully !"
          : "TaiKhoan has been aldready used !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (error) {
      reject(error);
    }
  });

//stafff
exports.registerServiceStaff = ({
  phone,
  password,
  fullname,
  email,
  address,
  roleId,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      // const column = await db.TaiKhoan.describe();

      // const x = Object.keys(column).pop();
      // console.log(x);
      const response = await db.Staff.findOrCreate({
        where: {
          phone,
        },
        defaults: {
          phone,
          password: hashPassword(password),
          fullname,
          email,
          phone,
          address,
          roleId,
        },
      });

      const token =
        response[1] &&
        jwt.sign(
          {
            phone: response[1].phone,
            password: response[1].password,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );
      resolve({
        error: token ? 0 : 2, // 0 thanh cong // 2 that bai
        msg: token
          ? "Register is successfully !"
          : "TaiKhoan has been aldready used !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await findOneUser(phone);
      const isCorrect =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrect &&
        jwt.sign(
          {
            phone: response.phone,
            password: response.password,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );

      resolve({
        error: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "Phone not found !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (error) {
      reject(error);
    }
  });
// staff
exports.loginServiceStaff = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await findOneStaff(phone);
      const isCorrect =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrect &&
        jwt.sign(
          {
            phone: response.phone,
            password: response.password,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "365d",
          }
        );

      resolve({
        error: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "Phone not found !",
        token: token || null,
        success: token ? true : false,
      });
    } catch (error) {
      reject(error);
    }
  });
