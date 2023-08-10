const db = require("../models");
const { getAllIngredientDao } = require("../dao/ingredient_order.dao");
const {
  statisticalProductDao,
  statisticalProductDaoDate,
} = require("../dao/order_item.dao");
const { getAllProductdao } = require("../dao/product.dao");

const { ReE, SS } = require("../utils/util.service");

exports.getAllIngredient = async (req, res) => {
  try {
    const data = await getAllIngredientDao();
    return SS(res, data);
  } catch (error) {
    return ReE(res, error);
  }
};

exports.statisticalProduct = async (req, res) => {
  try {
    const data = await statisticalProductDao();

    const product = await getAllProductdao();

    let datatk = [];
    for (const i of product) {
      let kt = 0;
      for (const j of data) {
        if (i.id === j.product_id) {
          kt = kt + 1;
        }
      }
      datatk.push({ ...i.dataValues, soluong: kt });
    }
    return SS(res, data);
  } catch (error) {
    return ReE(res, error);
  }
};

exports.statisticalRevenueProduct = async (req, res) => {
  try {
    const data = await statisticalProductDao();

    const product = await getAllProductdao();
    let tong = 0;
    let datatk = [];
    for (const i of product) {
      let kt = 0;
      for (const j of data) {
        if (i.id === j.product_id) {
          kt = kt + 1;
        }
      }

      datatk.push({ ...i.dataValues, soluong: kt, doanhthu: kt * i.price });
      tong = tong + kt * i.price;
    }

    return res.status(200).json({
      success: true,
      data,
      tong,
    });
  } catch (error) {
    return ReE(res, error);
  }
};

/// thong ke doanh thu theo ngay tuy chon
exports.statisticalRevenueProductDate = async (req, res) => {
  try {
    const { date } = req.body;
    const data = await statisticalProductDaoDate(date);
    const product = await getAllProductdao();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return ReE(res, error);
  }
};
