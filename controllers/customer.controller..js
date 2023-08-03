const db = require("../models");
const bcrypt = require("bcrypt");
const orderDao = require("../dao/order.dao");
const {
  getAllOrderByIdDao,
  getAllOrderByIdDaoTrue,
  getAllOrderByIdDaoFalse,
  editProfileDao,
} = require("../dao/customer.dao");
const { ReE, SS, TT, ReT, ReS, ReF } = require("../utils/util.service");
const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));
const checkOut = async (req, res) => {
  try {
    data = req.body.data;
    address = req.body.address;
    action = await orderDao.createOrderDao(data, address);

    res.status(200).json({
      success: true,
      msg: "hihi",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const getAllOrderById = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const order = await getAllOrderByIdDao(customer_id);
    return ReT(res, order, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

const getAllOrderByIdTrue = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const order = await getAllOrderByIdDaoTrue(customer_id);
    return ReT(res, order, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

const getAllOrderByIdFalse = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const order = await getAllOrderByIdDaoFalse(customer_id);
    return ReT(res, order, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, gender, email, phone, birthday, address } = req.body;
    const user = await editProfileDao({
      id,
      fullname,
      gender,
      email,
      phone,
      birthday,
      address,
    });

    if (user) {
      return ReS(res, 200, "Update successfull");
    } else {
      return ReF(res, 400, "Update Fail");
    }
  } catch (error) {
    return ReE(res, error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { user_id } = req.params;
    // const { passwordNew, passwordOld, passwordConfirm } = req.body;
    if (
      !req.body.passwordConfirm ||
      !req.body.passwordOld ||
      !req.body.passwordNew
    ) {
      return ReF(res, 400, "Bạn thiếu field");
    } else if (req.body.passwordConfirm != req.body.passwordNew) {
      return ReF(res, 400, "Password mới không hợp lệ");
    }
    const data = await db.Customer.findOne({
      where: {
        id: user_id,
      },
    });

    if (data) {
      const isPassword = bcrypt.hashSync(req.body.passwordOld, data.password);
      // console.log(isPassword);
      if (isPassword != data.password) {
        return ReF(res, 400, "Update Fail");
      } else {
        data.password = hashPassword(req.body.passwordNew);
        data.save();
        return ReS(res, 200, {
          message: "Update Data Success",
        });
      }
    }
    return ReS(res, 404, "Update Data Fail");
  } catch (error) {
    return ReE(res, error);
  }
};

// xem thong tin ca nhan
const ViewProfileCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const ktif = await db.Customer.findOne({
      where: { id: id },
    });
    if (ktif) {
      return ReT(res, ktif, 200);
    } else {
      return ReF(res, 400, "Fail !");
    }
  } catch (error) {
    return ReE(res, error);
  }
};
module.exports = {
  checkOut,
  getAllOrderById,
  getAllOrderByIdTrue,
  getAllOrderByIdFalse,
  editProfile,
  changePassword,
  ViewProfileCustomer,
};
