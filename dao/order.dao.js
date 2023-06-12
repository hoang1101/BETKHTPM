const db = require("../models");
async function createOrderDao(data, address) {
  try {
    console.log("dao i " + data[0].idCus);
    const order = await db.Order.create({
      customer_id: data[0].idCus,
      address: address,
      status: null,
    });
    try {
      for (let i of data) {
        const orderItem = await db.Order_Item.create({
          order_id: order.id,
          product_id: i.idPro,
          quantity: i.qty,
          price: i.price,
        });
      }
    } catch (error) {
      console.log("err ODIT: " + error.message);
    }
  } catch (err) {
    throw new Error(`${err}, traceback createOrderDao()`);
  }
}

async function AllOrderDao() {
  try {
    const order = await db.Order.findAll({
      where: {
        status: null,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return order;
  } catch (error) {
    throw new Error(`${error}, traceback AllOrderDao()`);
  }
}

module.exports = { createOrderDao, AllOrderDao };
