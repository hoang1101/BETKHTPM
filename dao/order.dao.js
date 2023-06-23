const db = require("../models");
const moment = require("moment");

async function createOrderDao(data, address) {
  try {
    // console.log("dao i " + data[0].idCus);
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
        date: new Date(
          moment(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            )
          ).format("YYYY-MM-DD")
        ),
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

async function AcceptOrderDao(id, staff_id, shipper) {
  try {
    const data = await db.Order_Item.findAll({ where: { order_id: id } });

    let data1 = await db.Recipe.findAll({});

    for (let i of data1) {
      for (const j of data) {
        if (i.product_id === j.product_id) {
          const findid = await db.Ingredient.findOne({
            where: { id: i.ingredient_id },
          });
          const quantity_old = findid.quantity;
          const data9 = await db.Ingredient.update(
            {
              quantity: quantity_old - i.quantity,
            },
            { where: { id: i.ingredient_id } }
          );
        }
      }
    }

    const order = await db.Order.update(
      {
        staff_id: staff_id,
        status: 1,
        shipper: shipper,
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
