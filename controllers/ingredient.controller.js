const db = require("../models");
const moment = require("moment");
const {
  ImportIngredientOrderItemDao,
  ImportIngredientOrderDao,
  IngredientImportDao,
  getOneIngredientByIdDao,
  getAllIngredientByIdDao,
  CancelIngredientOrderByIdDao,
  UnCancelIngredientOrderByIdDao,
} = require("../dao/ingredient_order.dao");
const { ReE, ReF, ReS, ReT } = require("../utils/util.service");
const { Op } = require("sequelize");
const { UpdatePriceProductDao } = require("../dao/recipre.dao");

/////////////////////////////////////////////////////////////////////////////////////////

// hoa don nhap
// khi huy thi active=1; mo khoa active=0

exports.ImportIngredientOrder = async (req, res) => {
  try {
    const staff_id = req.body.staff_id;
    const data = req.body.data;

    if (staff_id || data) {
      const i_order = await ImportIngredientOrderDao(staff_id);
      let check;
      for (let i of data) {
        const i_order_i = await ImportIngredientOrderItemDao(
          i.id,
          i_order.id,
          i.qty,
          i.price
        );
        // lay ra id cua tung nguyen lieu nhap vao
        const kt = await getOneIngredientByIdDao(i.id);
        // lay ra gia tri so luong va don gia trươc khi nhập vào
        const quantity_old = kt.quantity;
        const capital_price_old = kt.capital_price;
        // thực hiện cập nhật giá mới và số lượng mới
        const ingredient = await IngredientImportDao(
          i.qty + quantity_old,
          (i.qty * i.price + quantity_old * capital_price_old) /
            (i.qty + quantity_old),
          kt.id
        );
        check = ingredient;

        // tien hanh cap nhat gia moi cho sản phẩm liên quan đến nguyên liệu
        const recipe = await UpdatePriceProductDao(i.id);
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
    const data = await getAllIngredientByIdDao(id);
    if (data) {
      let check;
      for (let i of data) {
        const kt = await getOneIngredientByIdDao(i.ingredient_id);
        const quantity_old = kt.quantity;
        const capital_price_old = kt.capital_price;
        if (quantity_old < i.quantity || quantity_old - i.quantity === 0) {
          return ReF(
            res,
            400,
            "So luong nguyen lieu trong kho da dung den khong the huy"
          );
        }
        const ingredient = await IngredientImportDao(
          quantity_old - i.quantity,
          (quantity_old * capital_price_old - i.quantity * i.price) /
            (quantity_old - i.quantity),
          kt.id
        );

        const recipe = await UpdatePriceProductDao(i.ingredient_id);

        check = ingredient;
      }
      const i_order = await CancelIngredientOrderByIdDao(id);

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

// moi lam toi day

// mo huy hoa don do nhap sai
exports.UnCancelImportIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getAllIngredientByIdDao(id);
    if (data) {
      const i_order = await UnCancelIngredientOrderByIdDao(id);
      let check;
      for (let i of data) {
        const kt = await getOneIngredientByIdDao(i.ingredient_id);
        // lay gia tri
        const quantity_old = kt.quantity;
        const capital_price_old = kt.capital_price;

        const ingredient = await IngredientImportDao(
          quantity_old + i.quantity,
          (quantity_old * capital_price_old + i.quantity * i.price) /
            (quantity_old + i.quantity),
          kt.id
        );

        const recipe = await UpdatePriceProductDao(i.ingredient_id);
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
        capital_price: 0,
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
