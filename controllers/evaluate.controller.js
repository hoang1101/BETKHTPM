const { Sequelize } = require("sequelize");
const db = require("../models");
const { ReS, ReT, ReE, ReF } = require("../utils/util.service");
const cloudinary = require("cloudinary");
const moment = require("moment");
const config = require("../config/config");
const {
  createEvaluateNoImgDao,
  updateEvaluateNoImgDao,
  createEvaluateDao,
  updateEvaluateDao,
} = require("../dao/evaluate.dao");
exports.DanhGiaSanPham = async (req, res) => {
  try {
    const { id_orderitem, customer_id, product_id, start, img, comment } =
      req.body;

    if (!start || !comment)
      return ReF(res, 200, config.message.MISSING_DATA_INPUT);
    else {
      if (img) {
        let data;
        data = await cloudinary.v2.uploader.upload(
          img,
          {
            folder: "danhgia",
            width: 320,
            height: 320,
            crop: "scale",
          },
          function (error, result) {}
        );
        const evaluate = await createEvaluateDao(
          id_orderitem,
          customer_id,
          product_id,
          start,
          data.url,
          comment
        );
        if (evaluate) {
          return ReS(res, 200, config.message.UPDATE_SUCCESS);
        } else {
          return ReF(res, 200, config.message.UPDATE_FALSE);
        }
      } else {
        const evaluate = await createEvaluateNoImgDao(
          id_orderitem,
          customer_id,
          product_id,
          start,
          comment
        );
        if (evaluate) {
          return ReS(res, 200, config.message.UPDATE_SUCCESS);
        } else {
          return ReF(res, 200, config.message.UPDATE_FALSE);
        }
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.EditDanhGiaSanPham = async (req, res) => {
  try {
    const { id } = req.params;
    const { start, img, comment } = req.body;

    if (!start || !comment)
      return ReS(res, 200, config.message.MISSING_DATA_INPUT);
    else {
      if (img) {
        let data;
        data = await cloudinary.v2.uploader.upload(
          img,
          {
            folder: "danhgia",
            width: 320,
            height: 320,
            crop: "scale",
          },
          function (error, result) {}
        );
        const evaluate = await updateEvaluateDao(start, data.url, comment, id);
        if (evaluate) {
          return ReS(res, 200, config.message.UPDATE_SUCCESS);
        } else {
          return ReF(res, 200, config.message.UPDATE_FALSE);
        }
      } else {
        const evaluate = await updateEvaluateNoImgDao(start, comment, id);
        if (evaluate) {
          return ReS(res, 200, config.message.UPDATE_SUCCESS);
        } else {
          return ReF(res, 200, config.message.UPDATE_FALSE);
        }
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

// lay ra danh gia cua mot san pham
exports.getEvaluateProduct = async (req, res) => {
  try {
    const { id_product } = req.params;

    const result = await db.sequelize.query(
      `SELECT abc.*,cus.fullname from customer as cus,(SELECT eva.* FROM evaluate as eva,order_item as item
      where eva.id_orderitem=item.id &&item.product_id=${id_product}
      ) as abc
      where cus.id=abc.customer_id`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    return ReT(res, result, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// lay ra nhugn san pham cua minh mua nhung chua duoc danh gia

exports.getEvaluateCustomer = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const result = await db.sequelize.query(
      `
        SELECT product.name,product.image,product.price,product.descript , oi.order_id,oi.id,oi.quantity,e.date
        from product
        join order_item oi on oi.product_id= product.id
        LEFT JOIN evaluate e ON oi.id = e.id_orderitem
        LEFT JOIN orders o ON oi.order_id = o.id and o.status= true
        WHERE o.customer_id = ${customer_id} AND e.id_orderitem IS NULL

  `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    return ReT(res, result, 200);
  } catch (error) {
    s;
    return ReE(res, error);
  }
};

// lay ra nhugn san pham cua minh mua nhung da duoc danh gia

exports.getEvaluateCustomerDone = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const result = await db.sequelize.query(
      `
      SELECT product.name,product.image,product.price,product.descript , e.*,c.fullname,oi.quantity
      from product
      join order_item oi on oi.product_id= product.id
      LEFT JOIN evaluate e ON oi.id = e.id_orderitem
      LEFT JOIN customer c ON e.customer_id = c.id
      WHERE  e.customer_id = ${customer_id}

  `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    return ReT(res, result, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

///
