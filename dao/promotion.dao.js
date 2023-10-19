const { Op } = require("sequelize");
const db = require("../models");
const moment = require("moment");

// tạo mới khuyến mãi
async function createPromotionDao(
  product_id,
  staff_id,
  percent,
  start_day,
  end_day
) {
  try {
    const data = await db.Promotion.create({
      product_id: product_id,
      staff_id: staff_id,
      percent: percent,
      start_day: new Date(
        moment(new Date(start_day)).format("YYYY-MM-DD HH:mm:ss")
      ),
      end_day: new Date(
        moment(new Date(end_day)).format("YYYY-MM-DD HH:mm:ss")
      ),
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback createPromotionDao()`);
  }
}

// chỉnh sửa khuyến mãi

async function editPromotionDao(
  product_id,
  staff_id,
  percent,
  start_day,
  end_day,
  id
) {
  try {
    const data = await db.Promotion.update(
      {
        product_id: product_id,
        staff_id: staff_id,
        percent: percent,
        start_day: new Date(moment(new Date(start_day)).format("YYYY-MM-DD")),
        end_day: new Date(moment(new Date(end_day)).format("YYYY-MM-DD")),
      },
      {
        where: {
          id: id,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback editPromotionDao()`);
  }
}

// tìm promotion by id
async function getOnePromotionByIdDao(id) {
  try {
    const kt = await db.Promotion.findOne({
      where: { id: id },
    });
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getOnePromotionByIdDao()`);
  }
}

// delete promotion
async function deletePromotionDao(id) {
  try {
    const data = await db.Promotion.destroy({
      where: { id: id },
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback deletePromotionDao()`);
  }
}

// getAllPromotion đang diễn ra
async function getAllPromotionNowDao() {
  try {
    const data = await db.Promotion.findAll({
      include: [
        {
          model: db.Product,
          as: "product",
          attributes: ["name"],
        },
        {
          model: db.Staff,
          as: "staff",
          attributes: ["fullname"],
        },
      ],
      raw: true,
      where: {
        end_day: {
          [Op.gte]: new Date(
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
    throw new Error(`${error}, traceback getAllPromotionNowDao()`);
  }
}

// getAllPromotion đã hết hạn
async function getAllPromotionEndDao() {
  try {
    const data = await db.Promotion.findAll({
      include: [
        {
          model: db.Product,
          as: "product",
          attributes: ["name"],
        },
        {
          model: db.Staff,
          as: "staff",
          attributes: ["fullname"],
        },
      ],
      raw: true,
      where: {
        end_day: {
          [Op.lt]: new Date(
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
    throw new Error(`${error}, traceback getAllPromotionEndDao()`);
  }
}

///getAllPromotion đủ điều kiện để đăng ký (hết hạn ) hoặc chưa có được đăng ký
async function getAllPromotionRegisterDao() {
  try {
    const data1 = await db.Product.findAll({
      include: [
        {
          model: db.Promotion,
          as: "promotion",
        },
      ],
      where: {
        "$promotion.product_id$": null,
      },
    });

    const data = await db.Product.findAll({
      include: [
        {
          model: db.Promotion,
          as: "promotion",
          attributes: [],
          where: {
            end_day: {
              [Op.lt]: new Date(
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
        },
      ],
    });
    let kt = [...data, ...data1];
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getAllPromotionRegisterDao()`);
  }
}
module.exports = {
  createPromotionDao,
  editPromotionDao,
  getOnePromotionByIdDao,
  deletePromotionDao,
  getAllPromotionNowDao,
  getAllPromotionEndDao,
  getAllPromotionRegisterDao,
};
