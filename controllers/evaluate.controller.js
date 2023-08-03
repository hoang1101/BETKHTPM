const { Sequelize } = require("sequelize");
const db = require("../models");
const { ReS, ReT, ReE } = require("../utils/util.service");
const cloudinary = require("cloudinary");

exports.DanhGiaSanPham = async (req, res) => {
  try {
    const { id_orderitem, customer_id, product_id, start, img, comment } =
      req.body;

    if (!start || !comment) return ReS(res, 400, "Ban thieu Field!");
    else {
      const data = await cloudinary.v2.uploader.upload(
        img,
        {
          folder: "danhgia",
          width: 320,
          height: 320,
          crop: "scale",
        },
        function (error, result) {}
      );
      const evaluate = await db.Evaluate.create({
        id_orderitem,
        customer_id,
        product_id,
        start,
        img: data.url,
        comment,
      });
      if (evaluate) {
        return ReS(res, 200, "Tao thanh cong!");
      } else {
        return ReF(res, 400, "Tao khong thanh cong!");
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

    if (!start || !comment) return ReS(res, 400, "Ban thieu Field!");
    else {
      const data = await cloudinary.v2.uploader.upload(
        img,
        {
          folder: "danhgia",
          width: 320,
          height: 320,
          crop: "scale",
        },
        function (error, result) {}
      );
      const evaluate = await db.Evaluate.update(
        {
          start,
          img: data.url,
          comment,
        },
        {
          where: { id: id },
        }
      );
      if (evaluate) {
        return ReS(res, 200, "Tao thanh cong!");
      } else {
        return ReF(res, 400, "Tao khong thanh cong!");
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
    const evaluate = await db.Evaluate.findAll({
      where: {
        product_id: id_product,
      },
    });
    return ReT(res, evaluate, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// lay ra nhugn san pham cua minh mua nhung chua duoc danh gia

exports.getEvaluateCustomer = async (req, res) => {
  try {
    const { customer_id } = req.body;
    const result = await db.sequelize.query(
      `
        SELECT product.*,oi.*
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
    const { customer_id } = req.body;
    const result = await db.sequelize.query(
      `
      SELECT product.* , e.*
      from product
      join order_item oi on oi.product_id= product.id
      LEFT JOIN evaluate e ON oi.id = e.id_orderitem
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
