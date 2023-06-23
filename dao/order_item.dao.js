const { Op } = require("sequelize");
const moment = require("moment");
const db = require("../models");

async function statisticalProductDao() {
  try {
    let data = await db.Order_Item.findAll({
      include: [
        {
          model: db.Order,
          as: "order",
          where: {
            status: 1,
          },
          attributes: [],
        },
      ],
      where: {
        date: {
          [Op.eq]: new Date(
            moment(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
              )
            ).format("YYYY-MM-DD")
          ),
        },
      },
    });

    return data;
  } catch (error) {
    throw new Error(`${error}, traceback statisticalProductDao()`);
  }
}

async function statisticalProductDaoShipper() {
  try {
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Item,
          as: "order_item",

          where: {
            date: {
              [Op.eq]: new Date(
                moment(
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate()
                  )
                ).format("YYYY-MM-DD")
              ),
            },
          },
          // attributes: ["shipper"],
        },
      ],
      where: {
        status: 1,
      },
    });

    return data;
  } catch (error) {
    throw new Error(`${error}, traceback statisticalProductDaoShipper()`);
  }
}

module.exports = { statisticalProductDao, statisticalProductDaoShipper };
