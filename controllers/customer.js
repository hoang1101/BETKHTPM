const db = require("../models");
const orderDao = require("../dao/order.dao");
const checkOut = async (req, res) => {
  data = req.body.data;
  address = req.body.address;
  action = await orderDao.createOrderDao(data, address);
  res.status(200).json({
    success: true,
    msg: "hihi",
  });
};

module.exports = { checkOut };
