const db = require('../models');
const { getAllIngredientDao } = require('../dao/ingredient_order.dao');
const {
  statisticalProductDao,
  statisticalProductDaoShipper,
} = require('../dao/order_item.dao');
const { getAllProductdao } = require('../dao/product.dao');

const { ReE, SS } = require('../utils/util.service');
const { getAllShipperDao } = require('../dao/shipper.dao');

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
          console.log('hihi');
        }
      }
      datatk.push({ ...i.dataValues, soluong: kt });

      // if
    }
    return SS(res, datatk);
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
          // console.log("hihi");
        }
      }

      datatk.push({ ...i.dataValues, soluong: kt, doanhthu: kt * i.price });
      tong = tong + kt * i.price;

      // if
    }
    // console.log(tong);

    return res.status(200).json({
      success: true,
      datatk,
      tong,
    });
  } catch (error) {
    return ReE(res, error);
  }
};

// thống kê số đơn trong ngyaf của mỗi đơn vị vẫn chuyển
exports.statisticalShipper = async (req, res) => {
  try {
    const data1 = await statisticalProductDaoShipper();
    const data = await getAllShipperDao();

    let datatk = [];
    for (const i of data) {
      let kt = 0;
      for (const j of data1) {
        if (i.id === j.shipper) {
          kt = kt + 1;
          // console.log("hihi");
        }
      }
      datatk.push({ ...i.dataValues, soluong: kt });

      // if
    }
    return SS(res, datatk);
  } catch (error) {
    return ReE(res, error);
  }
};

// thong ke so tien cua moi don vi van chuyen trong ngay
exports.statisticalShipperRevenue = async (req, res) => {
  try {
    const data1 = await statisticalProductDaoShipper();
    const data = await getAllShipperDao();

    let datatk = [];
    let tong = 0;
    for (const i of data) {
      let kt = 0;
      let doanhso = 0;
      for (const j of data1) {
        if (i.id === j.shipper) {
          kt = kt + 1;
          for (const k of j.order_item) {
            doanhso += k.price * k.quantity;
          }
        }
      }
      tong = tong + doanhso;
      datatk.push({ ...i.dataValues, soluong: kt, doanhso: doanhso });

      // if
    }
    return res.status(200).json({
      datatk,
      tong,
    });
  } catch (error) {
    return ReE(res, error);
  }
};
