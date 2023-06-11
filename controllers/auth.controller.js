const bcrypt = require("bcrypt");
const authController = require("../services/auth.service");
const db = require("../models");

const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));

exports.loginCustomer = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone || !password)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });

    const customer = await db.Customer.findOne({
      where: {
        phone,
      },
    });
    console.log("hihi");

    const response = await authController.loginService(req.body);
    const token = response.token;
    const mgs = response.msg;
    if (response.success === true) {
      return res.status(200).json({
        success: true,
        token,
        data: customer,
      });
    } else {
      return res.status(200).json({
        success: false,
        mgs,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

/// login Staff
exports.loginStaff = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone || !password)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });

    const customer = await db.Staff.findOne({
      where: {
        phone,
      },
    });

    const response = await authController.loginServiceStaff(req.body);
    const token = response.token;
    const mgs = response.msg;
    if (response.success === true) {
      return res.status(200).json({
        success: true,
        token,
        data: customer,
      });
    } else {
      return res.status(200).json({
        success: false,
        mgs,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// register Customer

exports.register = async (req, res) => {
  const { password, fullname, email, phone, roleId, address } = req.body;
  console.log(req.body);
  try {
    if (!password || !fullname || !email || !phone)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });
    const response = await authController.registerService(req.body);

    if (response.success === true) {
      return res.status(200).json({
        success: true,
        response,
      });
    } else {
      return res.status(200).json({
        success: false,
        response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// register Staff

exports.registerStaff = async (req, res) => {
  const { password, fullname, email, phone, roleId, address } = req.body;
  console.log(req.body);
  try {
    if (!password || !fullname || !email || !phone || !roleId)
      return res.status(400).json({
        success: false,
        error: 1,
        msg: "Missing inputs !",
      });
    const response = await authController.registerServiceStaff(req.body);

    if (response.success === true) {
      return res.status(200).json({
        success: true,
        response,
      });
    } else {
      return res.status(200).json({
        success: false,
        response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
