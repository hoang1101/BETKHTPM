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
const {
  CheckPhoneCustomer,
  CheckEmailCustomer,
} = require("./until.controller");
const config = require("../config/config");
const { getAllIngredientDao } = require("../dao/ingredient.dao");
const { getAllRecipeDao } = require("../dao/recipre.dao");
const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));
const checkOut = async (req, res) => {
  try {
    data = req.body.data;
    address = req.body.address;
    action = await orderDao.createOrderDao(data, address);

    if (action) {
      return ReS(res, 200, config.message.ORDER_SUCCESS);
    }
    return ReF(res, 200, config.message.ORDER_FALSE);
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
    // console.log(id);
    const { fullname, gender, email, phone, birthday, address } = req.body;
    const kt = await CheckPhoneCustomer(id, phone);
    const ktemail = await CheckEmailCustomer(id, email);
    if (kt) {
      return ReF(res, 200, config.message.PHONE_DUPLICATE);
    } else if (ktemail) {
      return ReF(res, 200, config.message.EMAIL_DUPLICATE);
    } else {
      const user = await editProfileDao(
        id,
        fullname,
        email,
        phone,
        address,
        gender,
        birthday
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

const changePassword = async (req, res) => {
  try {
    const { user_id } = req.params;
    // const { passwordNew, passwordOld, passwordConfirm } = req.body;
    if (
      !req.body.passwordConfirm ||
      !req.body.passwordOld ||
      !req.body.passwordNew
    ) {
      return ReF(res, 200, config.message.MISSING_DATA_INPUT);
    } else if (req.body.passwordConfirm != req.body.passwordNew) {
      return ReF(res, 200, config.message.CHECK_PASS);
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
        return ReF(res, 200, config.message.UPDATE_FALSE);
      } else {
        data.password = hashPassword(req.body.passwordNew);
        data.save();
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      }
    }
    return ReF(res, 200, config.message.UPDATE_FALSE);
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
      return ReF(res, 200, config.message.UPDATE_FALSE);
    }
  } catch (error) {
    return ReE(res, error);
  }
};

const checkIngredient = async (req, res) => {
  try {
    data = req.body.data;

    // lay ra danh sach cac nguyen lieu trong cua hang
    const ingredient = await getAllIngredientDao();
    let KQ = {};
    for (let i of data) {
      const recipe = await getAllRecipeDao(i.id);
      for (let j of recipe) {
        if (KQ[j.ingredient_id]) {
          KQ[j.ingredient_id] += j.quantity * i.quantity;
        } else {
          KQ[j.ingredient_id] = j.quantity * i.quantity;
        }
      }
    }
    let j = 0;
    // console.log(KQ);
    for (let i of ingredient) {
      if (KQ[i.id]) {
        // console.log(i.quantity, KQ[i.id]);
        if (i.quantity - KQ[i.id] < 0) {
          return ReF(res, 200, config.message.VALIDATION_ERROR_E002);
        }
      }
    }
    return ReS(res, 200, config.message.VALIDATION_SUCCES_E001);
  } catch (error) {
    return ReE(res, error);
  }
};

const CustomerCancleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderDao.CustomerCancleOrderDao(id);
    return SS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
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
  checkIngredient,
  CustomerCancleOrder,
};
