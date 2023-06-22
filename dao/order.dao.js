const db = require("../models");
async function createOrderDao(data, address) {
  try {
    console.log("dao i " + data[0].idCus);
    const order = await db.Order.create({
      customer_id: data[0].idCus,
      address: address,
      status: null,
    });
    for (let i of data) {
      const orderItem = await db.Order_Item.create({
        order_id: order.id,
        product_id: i.idPro,
        quantity: i.qty,
        price: i.price,
      });
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

async function AcceptOrderDao(id, staff_id) {
  try {
    const order = await db.Order.update(
      {
        staff_id: staff_id,
        status: 1,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return order;
  } catch (error) {
    throw new Error(`${error}, traceback AcceptOrder()`);
  }
}

async function CancleOrderDao(id, staff_id) {
  try {
    const order = await db.Order.update(
      {
        staff_id: staff_id,
        status: 0,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return order;
  } catch (error) {
    throw new Error(`${error}, traceback AcceptOrder()`);
  }
}

module.exports = {
  createOrderDao,
  AllOrderDao,
  AcceptOrderDao,
  CancleOrderDao,
};
