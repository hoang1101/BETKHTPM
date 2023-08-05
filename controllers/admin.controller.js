const { Op } = require("sequelize");
const { searchCustomerDao } = require("../dao/customer.dao");
const db = require("../models");
const { ReE, ReS } = require("../utils/util.service");

exports.editProfileByAdmin = async (req, res) => {
  try {
    const { id, fullname, email, phone, address, gender, birthday, roleId } =
      req.body;
    const ktphone = await CheckPhone(phone);
    const ktemail = await CheckEmail(email);
    if (ktphone) {
      return ReF(res, 400, "So dien thoai bi trung !");
    } else if (ktemail) {
      return ReF(res, 400, "Email bi trung !");
    } else {
      const user = await db.Staff.update(
        {
          fullname: fullname,
          gender: gender,
          email: email,
          phone: phone,
          birthday: birthday,
          address: address,
          roleId: roleId,
        },
        {
          where: { id: id },
        }
      );
      if (user) {
        return ReS(res, 200, "Cap nhat thanh cong");
      } else {
        return ReF(res, 400, "That bai");
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
    const lock = await db.Customer.update(
      {
        isAcctive: 1,
      },
      {
        where: { id: id },
      }
    );
    if (lock) {
      return ReS(res, 200, "Successfull !");
    } else {
      return ReF(res, 400, "Fail!");
    }
  } catch (error) {
    return ReE(res, error);
  }
};

/// khoa mo tai khoan khach hang
exports.UnLockCustomer = async (req, res) => {
  try {
    const { id } = req.body;
    const lock = await db.Customer.update(
      {
        isAcctive: 0,
      },
      {
        where: { id: id },
      }
    );
    if (lock) {
      return ReS(res, 200, "Successfull !");
    } else {
      return ReF(res, 400, "Fail!");
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
    let condition = {};
    let response = {};
    if (page || limit || search) {
      if (!page || !limit) return ReE(res, 400, "Missing Data Field");
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
