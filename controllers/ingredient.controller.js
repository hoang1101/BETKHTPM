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
  getAllIngredientOrderStaffTrue,
  getAllIngredientOrderStaffFalse,
} = require("../dao/ingredient_order.dao");
const { ReE, ReF, ReS, ReT } = require("../utils/util.service");
const { Op } = require("sequelize");
const { UpdatePriceProductDao } = require("../dao/recipre.dao");
const config = require("../config/config");
const {
  getIngredientByName,
  getIngredientByNameDao,
  createIngredientDao,
  updateIngredientDao,
  deleteIngredientDao,
} = require("../dao/ingredient.dao");
const {
  getOneMeasure,
  getOneMeasureDao,
  createMeasureDao,
  updateMeasureDao,
} = require("../dao/measure.dao");

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
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
      }
    } else {
      return ReF(res, 200, config.message.MISSING_DATA_INPUT);
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
          return ReF(res, 200, config.message.INGREDIENT_QUANTITY);
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
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
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
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
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
    const kt = await getIngredientByNameDao(name);
    if (kt) {
      return ReF(res, 200, config.message.INGREDIENT_DUPLICATE);
    } else {
      const data = await createIngredientDao(name, measure_id);
      if (data) {
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
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

    const kt = await getIngredientByNameDao(name);
    if (kt && kt.id != id) {
      return ReF(res, 200, config.message.INGREDIENT_DUPLICATE);
    } else {
      const data = await updateIngredientDao(name, measure_id, id);
      if (data) {
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.DeleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const kt = await getOneIngredientOrderByIdDao(id);
    if (kt) {
      return ReF(res, 200, config.message.DELETE_ERROR);
    } else {
      const data = await deleteIngredientDao(id);
      if (data) {
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
      }
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.GetAllIngredient = async (req, res) => {
  try {
    const data = await getAllIngredientMeasureDao();
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// quan ly hoa don vat tu
exports.GetAllIngredientOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getAllIngredientOrderByIdDao();
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// danh sach hoa hon vat tu staff
exports.GetAllIngredientOrder = async (req, res) => {
  try {
    const data = await getAllIngredientOrderStaff();
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};
// danh sach hoa hon vat tu staff
exports.GetAllIngredientOrderT = async (req, res) => {
  try {
    const data = await getAllIngredientOrderStaffTrue();
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};
// danh sach hoa hon vat tu staff
exports.GetAllIngredientOrderF = async (req, res) => {
  try {
    const data = await getAllIngredientOrderStaffFalse();
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

// quan ly
exports.CreateMeasure = async (req, res) => {
  try {
    const { name } = req.body;
    const kt = await getOneMeasureDao(name);
    if (kt) {
      return ReF(res, 200, config.message.MEASURE_DUPLICATE);
    } else {
      const data = await createMeasureDao(name);
      if (data) {
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
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
    const kt = await getOneMeasureDao(name);
    if (kt && kt.id != id) {
      return ReF(res, 200, config.message.MEASURE_DUPLICATE);
    } else {
      const data = await updateMeasureDao(name, id);
      if (data) {
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
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
      return ReF(res, 200, config.message.DELETE_MEASURE);
    } else {
      const data = await db.Measure.destroy({
        where: { id: id },
      });
      if (data) {
        return ReS(res, 200, config.message.UPDATE_SUCCESS);
      } else {
        return ReF(res, 200, config.message.UPDATE_FALSE);
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
