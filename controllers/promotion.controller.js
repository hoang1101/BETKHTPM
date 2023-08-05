const db = require("../models");
const moment = require("moment");
const { ReS, ReE, ReF, ReT } = require("../utils/util.service");
const { Op } = require("sequelize");

exports.CreatePromotion = async (req, res) => {
  try {
    arr = req.body.data;
    const { staff_id, percent, start_day, end_day } = req.body;
    // const ktpromotion = await db.Promotion.findOne({
    //   where: {
    //     product_id: product_id,
    //   },
    // });
    // if (ktpromotion) {
    //   const ktdate = await db.Promotion.findAll({
    //     where: { product_id: product_id },
    //   });

    //   ktdate.sort((a, b) => new Date(a.end_day) - new Date(b.end_day));
    //   let kt = ktdate[ktdate.length - 1];
    //   if (
    //     kt.end_day <
    //     new Date(
    //       moment(
    //         new Date(
    //           new Date().getFullYear(),
    //           new Date().getMonth(),
    //           new Date().getDate()
    //         )
    //       ).format("YYYY-MM-DD")
    //     )
    //   ) {
    let data;
    for (let i of arr) {
      data = await db.Promotion.create({
        product_id: i,
        staff_id: staff_id,
        percent: percent,
        start_day: new Date(moment(new Date(start_day)).format("YYYY-MM-DD")),
        end_day: new Date(moment(new Date(end_day)).format("YYYY-MM-DD")),
      });
    }
    if (data) {
      return ReS(res, 200, "Tao thanh cong");
    } else {
      return ReF(res, 400, "Tao khong thanh cong");
    }
    // } else {
    //   return ReF(res, 400, "Dang ton tai ma giam gia!");
    // }
    // } else {
    //   const data = await db.Promotion.create({
    //     product_id: product_id,
    //     staff_id: staff_id,
    //     percent: percent,
    //     start_day: new Date(moment(new Date(start_day)).format("YYYY-MM-DD")),
    //     end_day: new Date(moment(new Date(end_day)).format("YYYY-MM-DD")),
    //   });
    //   if (data) {
    //     return ReS(res, 200, "Tao thanh cong");
    //   } else {
    //     return ReF(res, 400, "Tao khong thanh cong");
    //   }
    // }
  } catch (error) {
    return ReE(res, error);
  }
};
// chinh sua
exports.editPromotion = async (req, res) => {
  try {
    const { id, product_id, staff_id, percent, start_day, end_day } = req.body;
    const kt = await db.Promotion.findOne({
      where: { id: id },
    });
    if (
      kt.start_day >
      new Date(
        moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("YYYY-MM-DD")
      )
    ) {
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
      if (data) {
        return ReS(res, 200, "Update thanh cong");
      } else {
        return ReF(res, 400, "Update khong thanh cong");
      }
    } else {
      return ReF(res, 400, "Ma khuyen mai nay da duoc su dung ");
    }
  } catch (error) {
    return ReE(res, error);
  }
};

// xoa
exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const kt = await db.Promotion.findOne({
      where: { id: id },
    });
    if (
      kt.start_day >
      new Date(
        moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("YYYY-MM-DD")
      )
    ) {
      const data = await db.Promotion.destroy({
        where: { id: id },
      });
      if (data) {
        return ReS(res, 200, "Xoa thanh cong");
      } else {
        return ReF(res, 400, "Xoa khong thanh cong");
      }
    } else {
      return ReF(res, 400, "Ma khuyen mai nay da duoc su dung ");
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.GetAllPromotionNow = async (req, res) => {
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
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

exports.GetAllPromotionEnd = async (req, res) => {
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
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};
