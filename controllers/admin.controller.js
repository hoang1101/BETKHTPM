const { Op } = require("sequelize");
const { searchCustomerDao } = require("../dao/customer.dao");
const db = require("../models");
const { ReE, ReS, ReF } = require("../utils/util.service");
const { CheckPhone, CheckEmail } = require("./until.controller");
const config = require("../config/config");
const {
  updateProfileByAdminDao,
  lockCustomerDao,
  unLockCustomerDao,
} = require("../dao/staff.dao");

exports.editProfileByAdmin = async (req, res) => {
  try {
    const { id, fullname, email, phone, address, gender, birthday, roleId } =
      req.body;
    console.log(id);
    const ktphone = await CheckPhone(id, phone);
    console.log(ktphone);
    const ktemail = await CheckEmail(id, email);
    if (ktphone) {
      return ReF(res, 200, config.message.PHONE_DUPLICATE);
    } else if (ktemail) {
      return ReF(res, 200, config.message.EMAIL_DUPLICATE);
    } else {
      // hàm update profile staff
      const user = await updateProfileByAdminDao(
        fullname,
        gender,
        email,
        phone,
        birthday,
        address,
        roleId,
        id
      );
      if (user) {
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

/// khoa mo tai khoan khach hang
exports.LockCuatomer = async (req, res) => {
  try {
    const { id } = req.body;
    const lock = await lockCustomerDao(id);
    if (lock) {
      return ReS(res, 200, config.message.UPDATE_SUCCESS);
    } else {
      return ReF(res, 200, config.message.UPDATE_FALSE);
    }
  } catch (error) {
    return ReE(res, error);
  }
};

/// khoa mo tai khoan khach hang
exports.UnLockCustomer = async (req, res) => {
  try {
    const { id } = req.body;
    const lock = await unLockCustomerDao(id);
    if (lock) {
      return ReS(res, 200, config.message.UPDATE_SUCCESS);
    } else {
      return ReF(res, 200, config.message.UPDATE_FALSE);
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.FindAcountCustomer = async (req, res) => {
  try {
    const page = req.query?.page * 1;
    const limit = req.query?.limit * 1;
    const search = req.query?.search;
    const isAcctive = req.query?.isAcctive;
    let condition = {
      isAcctive: { [Op.like]: `%${isAcctive}%` },
    };
    let response = {};
    if (page || limit || search) {
      if (!page || !limit)
        return ReE(res, 200, config.message.MISSING_DATA_INPUT);
      if (search) {
        condition = {
          ...condition,
          ...{
            fullname: { [Op.like]: `%${search}%` },
          },
        };
      }
      const { rows, count } = await searchCustomerDao(
        condition,
        page - 1,
        limit
      );
      response.count = count;
      response.customer = rows;
    }
    return res.status(200).json({
      success: true,
      count: response.count,
      data: [...response.customer],
    });
  } catch (error) {
    return ReE(res, error);
  }
};
