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

module.exports = { statisticalProductDao };
