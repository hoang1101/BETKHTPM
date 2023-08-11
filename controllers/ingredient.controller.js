const db = require("../models");
const moment = require("moment");
const {
  ImportIngredientDao,
  UpdateImportIngredientDao,
} = require("../dao/ingredient_order.dao");
const { ReE, ReF, ReS, ReT } = require("../utils/util.service");
const { Op } = require("sequelize");

exports.ImportIngredient = async (req, res) => {
  try {
    const { staff_id, ingredient_id, price, quantity } = req.body;
    const data = ImportIngredientDao(staff_id, ingredient_id, price, quantity);
    const data1 = UpdateImportIngredientDao(ingredient_id, quantity);
    if (data) {
      return res.status(200).json({
        success: true,
        // response: data,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Loi khong tao thanh cong!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

// hoa don nhap

exports.ImportIngredientOrder = async (req, res) => {
  try {
    const staff_id = req.body.staff_id;
    const data = req.body.data;

    if (staff_id || data) {
      const i_order = await db.Ingredient_Order.create({
        staff_id: staff_id,
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
      let check;
      for (let i of data) {
        const i_order_i = await db.IngredientOrderItem.create({
          ingredient_id: i.id,
          ingredient_order_id: i_order.id,
          quantity: i.qty,
          price: i.price,
        });
        const kt = await db.Ingredient.findOne({
          where: { id: i.id },
        });
        const quantity_old = kt.quantity;
        const ingredient = await db.Ingredient.update(
          {
            quantity: i.qty + quantity_old,
          },
          { where: { id: kt.id } }
        );

        check = ingredient;
      }
      if (check) {
        return ReS(res, 200, "Thanh cong");
      } else {
        return ReF(res, 400, "Khong thanh cong");
      }
    } else {
      return ReF(res, 400, "Ban nhap thieu du lieu");
    }
  } catch (error) {
    return ReE(res, error);
  }
};

// huy hoa don do nhap sai
exports.CancelImportIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.IngredientOrderItem.findAll({
      where: { ingredient_order_id: id },
    });
    if (data) {
      const i_order = await db.Ingredient_Order.update(
        {
          activate: false,
        },
        {
          where: { id: id },
        }
      );
      let check;
      for (let i of data) {
        const kt = await db.Ingredient.findOne({
          where: { id: i.ingredient_id },
        });
        // console.log(kt.quantity);
        const quantity_old = kt.quantity;
        const ingredient = await db.Ingredient.update(
          {
            quantity: quantity_old - i.quantity,
          },
          { where: { id: kt.id } }
        );

        check = ingredient;
      }
      if (check) {
        return ReS(res, 200, "Thanh cong");
      } else {
        return ReF(res, 400, "Khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};
// mo huy hoa don do nhap sai
exports.UnCancelImportIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.IngredientOrderItem.findAll({
      where: { ingredient_order_id: id },
    });
    if (data) {
      const i_order = await db.Ingredient_Order.update(
        {
          activate: true,
        },
        {
          where: { id: id },
        }
      );
      let check;
      for (let i of data) {
        const kt = await db.Ingredient.findOne({
          where: { id: i.ingredient_id },
        });
        // console.log(kt.quantity);
        const quantity_old = kt.quantity;
        const ingredient = await db.Ingredient.update(
          {
            quantity: quantity_old + i.quantity,
          },
          { where: { id: kt.id } }
        );

        check = ingredient;
      }
      if (check) {
        return ReS(res, 200, "Thanh cong");
      } else {
        return ReF(res, 400, "Khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};
// tao  ingretdient

exports.CreateIngredient = async (req, res) => {
  try {
    const { name, measure_id } = req.body;
    const kt = await db.Ingredient.findOne({
      where: { name: name },
    });
    if (kt) {
      return ReF(res, 400, "Da ton tai ten nguyen lieu nay");
    } else {
      const data = await db.Ingredient.create({
        name: name,
        measure_id: measure_id,
        quantity: 0,
      });
      if (data) {
        return ReS(res, 200, "Thanh cong");
      } else {
        return ReF(res, 400, "Khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

// sua ingredien

exports.EditIngredient = async (req, res) => {
  try {
    const { id, name, measure_id } = req.body;

    const kt = await db.Ingredient.findOne({
      where: { name: name },
    });
    if (kt && kt.id != id) {
      return ReF(res, 400, "Da ton tai ten nguyen lieu nay");
    } else {
      const data = await db.Ingredient.update(
        {
          name: name,
          measure_id: measure_id,
        },
        { where: { id: id } }
      );
      if (data) {
        return ReS(res, 200, "Thanh cong");
      } else {
        return ReF(res, 400, "Khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.DeleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const kt = await db.IngredientOrderItem.findOne({
      where: {
        ingredient_id: id,
      },
    });
    if (kt) {
      return ReF(res, 400, "Xoa khong thanh cong, da ton tai");
    } else {
      const data = await db.Ingredient.destroy({
        where: { id: id },
      });
      if (data) {
        return ReS(res, 200, "Xoa thanh cong");
      } else {
        return ReF(res, 400, "Xoa khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.GetAllIngredient = async (req, res) => {
  try {
    const data = await db.Ingredient.findAll({
      include: [
        {
          model: db.Measure,
          as: "measure",
        },
      ],
      raw: true,
    });
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// quan ly hoa don vat tu
exports.GetAllIngredientOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.IngredientOrderItem.findAll({
      where: { ingredient_order_id: id },
      include: [
        {
          model: db.Ingredient,
          as: "ingredient",
          attributes: ["name"],
          include: [{ model: db.Measure, as: "measure", attributes: ["name"] }],
        },

        {
          model: db.Ingredient_Order,
          as: "ingredient_order",
          include: [
            {
              model: db.Staff,
              as: "staff",
              attributes: ["fullname"],
            },
          ],
          attributes: ["id"],
        },
      ],
      raw: true,
    });
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// danh sach hoa hon vat tu staff
exports.GetAllIngredientOrder = async (req, res) => {
  try {
    const data = await db.Ingredient_Order.findAll({
      include: [
        {
          model: db.Staff,
          as: "staff",
          attributes: ["fullname"],
        },
      ],
      raw: true,
    });
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};
// danh sach hoa hon vat tu staff
exports.GetAllIngredientOrderT = async (req, res) => {
  try {
    const data = await db.Ingredient_Order.findAll({
      include: [
        {
          model: db.Staff,
          as: "staff",
          attributes: ["fullname"],
        },
      ],
      where: {
        activate: true,
      },
      raw: true,
    });
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};
// danh sach hoa hon vat tu staff
exports.GetAllIngredientOrderF = async (req, res) => {
  try {
    const data = await db.Ingredient_Order.findAll({
      include: [
        {
          model: db.Staff,
          as: "staff",
          attributes: ["fullname"],
        },
      ],
      where: {
        activate: false,
      },
      raw: true,
    });
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// quan ly
exports.CreateMeasure = async (req, res) => {
  try {
    const { name } = req.body;
    const kt = await db.Measure.findOne({
      where: {
        name: name,
      },
    });
    if (kt) {
      return ReF(res, 400, "Da ton tai");
    } else {
      const data = await db.Measure.create({
        name,
      });
      if (data) {
        return ReS(res, 200, "Tao thanh cong");
      } else {
        return ReF(res, 400, "Tao khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.EditMeasure = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const kt = await db.Measure.findOne({
      where: {
        name: name,
      },
    });
    if (kt && kt.id != id) {
      return ReF(res, 400, "Da ton tai");
    } else {
      const data = await db.Measure.update(
        {
          name,
        },
        { where: { id: id } }
      );
      if (data) {
        return ReS(res, 200, "Update thanh cong");
      } else {
        return ReF(res, 400, "Update khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.DeleteMeasure = async (req, res) => {
  try {
    const { id } = req.params;
    const kt = await db.Ingredient.findOne({
      where: {
        measure_id: id,
      },
    });
    if (kt) {
      return ReF(res, 400, "Xoa khong thanh cong, da ton tai");
    } else {
      const data = await db.Measure.destroy({
        where: { id: id },
      });
      if (data) {
        return ReS(res, 200, "Xoa thanh cong");
      } else {
        return ReF(res, 400, "Xoa khong thanh cong");
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.getAllMeasure = async (req, res) => {
  try {
    const data = await db.Measure.findAll({});
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

///
