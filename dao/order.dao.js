const db = require("../models");
const moment = require("moment");

// async function checkIngredient(data)

async function createOrderDao(data, address) {
  try {
    // console.log("dao i " + data[0].idCus);
    const order = await db.Orders.create({
      customer_id: data[0].idCus,
      address: address,
      status: null,
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
    for (let i of data) {
      const orderItem = await db.Order_Item.create({
        order_id: order.id,
        product_id: i.idPro,
        quantity: i.qty,
        price: i.price,
        capital_price: i.capital_price,
      });
    }

    const order_item = await db.Order_Item.findAll({
      where: { order_id: order.id },
    });

    let data1 = await db.Recipe.findAll({});

    for (let i of data1) {
      for (const j of order_item) {
        if (i.product_id === j.product_id) {
          const findid = await db.Ingredient.findOne({
            where: { id: i.ingredient_id },
          });
          const quantity_old = findid.quantity;
          const data9 = await db.Ingredient.update(
            {
              quantity: quantity_old - i.quantity * j.quantity,
            },
            { where: { id: i.ingredient_id } }
          );
        }
      }
    }

    if (order) {
      return true;
    } else return false;
  } catch (err) {
    throw new Error(`${err}, traceback createOrderDao()`);
  }
}

async function AllOrderDao() {
  try {
    const order = await db.Orders.findAll({
      include: [
        {
          model: db.Staff,
          as: "staff",
          attributes: ["fullname"],
        },
        {
          model: db.Customer,
          as: "customer",
          attributes: ["fullname"],
        },
      ],
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return order;
  } catch (error) {
    throw new Error(`${error}, traceback AllOrderDao()`);
  }
}

async function AcceptOrderDao(id, staff_id) {
  try {
    const order = await db.Orders.update(
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
              quantity: quantity_old + i.quantity * j.quantity,
            },
            { where: { id: i.ingredient_id } }
          );
        }
      }
    }
    const order = await db.Orders.update(
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
    throw new Error(`${error}, traceback CancleOrderDao()`);
  }
}
async function getOrderById(id) {
  try {
    const order = await db.Order_Item.findAll({
      where: { order_id: id },
      include: [
        {
          model: db.Product,
          as: "product",
          attributes: ["id", "name", "image", "price", "descript"],
        },
      ],

      exclude: ["createdAt", "updatedAt"],
    });

    return order;
  } catch (error) {
    throw new Error(`${error}, traceback AcceptOrder()`);
  }
}

// customer huy don
async function CustomerCancleOrderDao(id) {
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
              quantity: quantity_old + i.quantity * j.quantity,
            },
            { where: { id: i.ingredient_id } }
          );
        }
      }
    }
    const order = await db.Orders.update(
      {
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
    throw new Error(`${error}, traceback CustomerCancleOrderDao()`);
  }
}

// tìm kiếm đơn hàng
async function getOneOrdersById(id) {
  try {
    const kt = await db.Orders.findOne({
      where: { id: id },
    });
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getOneOrdersById()`);
  }
}

///getOneOrdersByStaffId
async function getOneOrdersByStaffId() {
  try {
    const ktstaff = await db.Orders.findOne({
      where: { staff_id: id },
    });
    return ktstaff;
  } catch (error) {
    throw new Error(`${error}, traceback getOneOrdersByStaffId()`);
  }
}

//getAllOrderBusinessDao
async function getAllOrderBusinessDao(id) {
  try {
    const data = await db.Orders.findAll({
      where: {
        staff_id: id,
      },
      include: [
        {
          model: db.Customer,
          as: "customer",
          attributes: ["fullname"],
        },
        {
          model: db.Staff,
          as: "staff",
          attributes: ["fullname"],
        },
      ],
      raw: true,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllOrderBusinessDao()`);
  }
}
module.exports = {
  createOrderDao,
  AllOrderDao,
  AcceptOrderDao,
  CancleOrderDao,
  getOrderById,
  CustomerCancleOrderDao,
  getOneOrdersById,
  getOneOrdersByStaffId,
  getAllOrderBusinessDao,
};
