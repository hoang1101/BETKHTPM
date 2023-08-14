const { Op } = require("sequelize");
const moment = require("moment");
const db = require("../models");

async function statisticalProductDao() {
  try {
    let data = await db.Order_Item.findAll({
      include: [
        {
          model: db.Orders,
          as: "orders",
          where: {
            status: 1,
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
          attributes: [],
        },
      ],
    });

    return data;
  } catch (error) {
    throw new Error(`${error}, traceback statisticalProductDao()`);
  }
}

async function statisticalProductDaoDate(date_, date__) {
  try {
    let data = await db.Order_Item.findAll({
      include: [
        {
          model: db.Orders,
          as: "orders",
          where: {
            status: 1,
            date: {
              [Op.between]: [
                new Date(moment(new Date(date_)).format("YYYY-MM-DD")),
                new Date(moment(new Date(date__)).format("YYYY-MM-DD")),
              ],
            },
          },

          attributes: [],
        },
      ],
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback statisticalProductDaoDate()`);
  }
}

module.exports = { statisticalProductDao, statisticalProductDaoDate };
