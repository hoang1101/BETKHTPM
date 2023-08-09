const bcrypt = require("bcrypt");
const {
  AllOrderDao,
  AcceptOrderDao,
  CancleOrderDao,
  getOrderById,
} = require("../dao/order.dao");
const {
  createProductdao,
  editProductdao,
  deleteProductdao,
  getProductdao,
} = require("../dao/product.dao");
const { createRecipe } = require("../dao/recipre.dao");
const { SS, TT, ReS, ReF, ReE, ReT, to } = require("../utils/util.service");
const db = require("../models");
const semail = require("../utils/mailer");
const {
  findOneStaff,
  findOneStaffEmail,
  searchStaffDao,
} = require("../dao/staff.dao");
const { Op } = require("sequelize");
const { CheckPhone, CheckEmail } = require("./until.controller");
const { searchOrderDao } = require("../dao/customer.dao");
const {
  ContentActiveAccount_vi,
  ContentOrderTrue,
  ContentOrderFalse,
} = require("../template/email");

const hashPassword = (MatKhau) =>
  bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(12));

exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, descript } = req.body;
    const recipre = req.body.recipre;
    const kt = await db.Product.findOne({
      where: { name: name },
    });
    if (kt) {
      return ReF(res, 400, "Da ton tai ten san pham");
    } else {
      const product = await createProductdao(
        name,
        price,
        image,
        descript,
        recipre
      );
      // const recipe = await createRecipe(recipre);
      if (product) {
        return ReS(res, 200, "Cap nhat thanh cong");
      } else {
        return res.status(400).json({
          success: false,
          msg: "Loi khong tao thanh cong!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, descript } = req.body;
    const kt = await db.Product.findOne({
      where: { name: name },
    });
    if (kt && kt.id != id) {
      return ReF(res, 400, "Da ton tai ten san pham");
    } else {
      const product = await editProductdao(id, name, price, image, descript);
      if (product) {
        return ReS(res, 200, "Cap nhat thanh cong");
      } else {
        return res.status(400).json({
          success: false,
          msg: "Loi khong tao thanh cong!",
        });
      }
    }
    // console.log(id, name, price, image, descript, recipre);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const kt = await db.Order_Item.findOne({
      where: { product_id: id },
    });
    let product = await getProductdao(id);
    if (!product) {
      return ReF(res, 400, "Khong ton tai");
    } else {
      if (kt) {
        return ReF(res, 400, "San pham nay da duoc mua");
      } else {
        const data = await deleteProductdao(id);
        return res.status(200).json({
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// danh sach don hang chua xu li

exports.AllOrder = async (req, res) => {
  try {
    // const { order_id, status } = req.params;

    const order = await AllOrderDao();
    return SS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
exports.AcceptOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { staff_id } = req.body;

    const order = await AcceptOrderDao(id, staff_id);

    if (order) {
      const kt = await db.Orders.findOne({
        where: { id: id },
      });
      const cus = await db.Customer.findOne({
        where: {
          id: kt.customer_id,
        },
      });
      to(
        semail.sendMail({
          to: cus.email,
          subject: "Thông báo mua hàng",
          body: ContentOrderTrue(cus.fullname, id),
        })
      );
    }

    return ReS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
exports.CancleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { staff_id } = req.body;

    const order = await CancleOrderDao(id, staff_id);
    if (order) {
      const kt = await db.Orders.findOne({
        where: { id: id },
      });
      const cus = await db.Customer.findOne({
        where: {
          id: kt.customer_id,
        },
      });
      to(
        semail.sendMail({
          to: cus.email,
          subject: "Thông báo mua hàng",
          body: ContentOrderFalse(cus.fullname, id),
        })
      );
    }
    return SS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.detailOrderByid = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    return SS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
// danh sach don hang

// tim kiem don hang theo so dien thoai
exports.FindOrder = async (req, res) => {
  try {
    // const page = req.query?.page * 1;
    // const limit = req.query?.limit * 1;
    const search = req.query?.search;
    let condition = {};
    let response = {};
    // if (page || limit || search) {
    //   if (!page || !limit) return ReF(res, 400, "Missing Data Field");
    if (search) {
      condition = {
        ...condition,
        ...{
          phone: { [Op.like]: `%${search}%` },
        },
      };
    }
    const { rows, count } = await searchOrderDao(condition);
    response.count = count;
    response.order = rows;
    // }
    return res.status(200).json({
      success: true,
      count: response.count,
      data: [...response.order],
    });
  } catch (error) {
    return ReE(res, error);
  }
};

/// quản lý nhân viên
// khóa tài khoản
exports.LockAccount = async (req, res) => {
  try {
    const { id } = req.body;
    // const ktstaff = await db.Orders.findOne({
    //   where: { staff_id: id },
    // });
    // if (ktstaff) {
    //   return ReF(res, 400, "Tai khoan nay da duyet don hang !");
    // } else {
    const staff = await db.Staff.update(
      {
        isAcctive: 1,
      },
      { where: { id: id } }
    );
    if (staff) {
      return ReS(res, 200, "Successfull !");
    } else {
      return ReF(res, 400, "Fail!");
    }
    // }
  } catch (error) {
    return ReE(res, error);
  }
};

// mo khoa tai khaon

exports.UnLockAccount = async (req, res) => {
  try {
    const { id } = req.body;

    const staff = await db.Staff.update(
      {
        isAcctive: 0,
      },
      { where: { id: id } }
    );
    if (staff) {
      return ReS(res, 200, "Successfull !");
    } else {
      return ReF(res, 400, "Fail!");
    }
  } catch (error) {
    return ReE(res, error);
  }
};

// chinh sua thong tin nhan vien
exports.EditAcount = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, phone, address, gender, birthday, roleId } =
      req.body;
    const ktphone = await CheckPhone(id, phone);
    const ktemail = await CheckEmail(id, email);
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

// doi mat khau

exports.changePasswordStaff = async (req, res) => {
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
    const data = await db.Staff.findOne({
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

/// tim kiem nhan vien

exports.FindAcountStaff = async (req, res) => {
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
      const { rows, count } = await searchStaffDao(condition, page - 1, limit);
      response.count = count;
      response.staff = rows;
    }
    return res.status(200).json({
      success: true,
      count: response.count,
      data: [...response.staff],
    });
  } catch (error) {
    return ReE(res, error);
  }
};

/// xoa mot nhan vien
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const ktstaff = await db.Orders.findOne({
      where: { staff_id: id },
    });
    if (ktstaff) {
      return ReF(res, 400, "Tai khoan nay da duyet don hang !");
    } else {
      const data = await db.Staff.destroy({
        where: { id: id },
      });
      if (data) {
        return ReS(res, 200, "Da xoa thanh cong");
      } else {
        return ReF(res, 200, "Xoa khong thanh cong");
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// edit profile staff

// xem thong tin ca nhan

exports.ViewProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const ktif = await db.Staff.findOne({
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

///cong thuc

exports.GetAllRecipe = async (req, res) => {
  try {
    const { product_id } = req.params;
    const data = await db.Recipe.findAll({
      // group: ["product_id"],
      where: { product_id: product_id },
      include: [
        {
          model: db.Ingredient,
          as: "ingredient",
          attributes: ["name"],
        },
      ],
      raw: true,
    });
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};
exports.EditRecipe = async (req, res) => {
  try {
  } catch (error) {
    return ReE(res, error);
  }
};
