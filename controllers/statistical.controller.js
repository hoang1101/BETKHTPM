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

/// thong ke doanh thu, loi nhuan theo ngay tuy chon
exports.statisticalRevenueProductDate = async (req, res) => {
  try {
    const { date, date_end } = req.body;
    // lấy ra những đơn hàng trong khoảng thời gian đó
    const data = await statisticalProductDaoDate(date, date_end);
    const product = await getAllProductdao();

    let datatk = [];

    let tong = 0;
    for (let i of product) {
      let sl = 0,
        dg = 0;
      for (let j of data) {
        if (i.id === j.product_id) {
          sl = sl + j.quantity;
          dg = j.price * j.quantity;
        }
      }
      if (sl > 0) {
        datatk.push({
          ...i,
          sl: sl,
          dg: dg,
        });
        tong = tong + dg;
      }
    }

    return res.status(200).json({
      success: true,
      datatk,
      count: tong,
    });
  } catch (error) {
    return ReE(res, error);
  }
};
// thong ke doang thu theo ngya thang nam
//  thong ke khach hang top
exports.getCustomerOrder = async (req, res) => {
  try {
    const data = await db.Customer.findAll({
      attributes: [
        "id",
        "fullname",
        [db.sequelize.fn("COUNT", db.sequelize.col("Orders.id")), "orderCount"],
      ], // Chỉ lấy trường id và name của khách hàng
      include: [
        {
          model: db.Orders,
          as: "orders",
          attributes: [],
        },
      ],
      group: ["Customer.id"], // Gom nhóm theo id của khách hàng
      raw: true, // Trả về dữ liệu dưới dạng plain object
      nest: true, // Lồng dữ liệu khách hàng trong một object
      order: [[db.sequelize.literal("orderCount"), "DESC"]], // Sắp xếp giảm dần theo orderCount
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return ReE(res, error);
  }
};

// thống kê doanh thu và lợi nhuận cùng với tiền đã chi trong ngày-ngày
exports.statisticalRevenueProductDateVer2 = async (req, res) => {
  try {
    const { date, date_end } = req.body;
    // lấy ra những đơn hàng trong khoảng thời gian đó
    const data = await statisticalProductDaoDate(date, date_end);

    const product = await getAllProductdao();

    let datatk = [];
    let tong = 0;
    for (let i of product) {
      let sl = 0,
        dg = 0;
      for (let j of data) {
        sl = sl + j.quantity;
        dg = dg + (j.price * j.quantity - j.capital_price * j.quantity);
      }
      if (sl > 0) {
        datatk.push({
          ...i,
          sl: sl,
          profit: dg,
        });
        tong = tong + dg;
      }
    }

    return res.status(200).json({
      success: true,
      datatk,
      count: tong,
    });
  } catch (error) {
    return ReE(res, error);
  }
};
