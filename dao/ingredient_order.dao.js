const db = require("../models");
const moment = require("moment");

// create chi tiet hoa don nhap
async function ImportIngredientOrderItemDao(id, order_id, qty, price) {
  try {
    const ingre = await db.IngredientOrderItem.create({
      ingredient_id: id,
      ingredient_order_id: order_id,
      quantity: qty,
      price: price,
    });
    return ingre;
  } catch (error) {
    throw new Error(`${error}, traceback ImportIngredientOrderItemDao()`);
  }
}

// create hoa don nhap
async function ImportIngredientOrderDao(staff_id) {
  try {
    const ingre = await db.Ingredient_Order.create({
      staff_id: staff_id,
      date: new Date(
        moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("YYYY-MM-DD HH:mm:ss")
      ),
    });
    return ingre;
  } catch (error) {
    throw new Error(`${error}, traceback ImportIngredientOrderDao()`);
  }
}
// update nguyen lieu khi import

async function IngredientImportDao(quantity, capital_price, id) {
  try {
    const ingredient = await db.Ingredient.update(
      {
        quantity: quantity,
        capital_price: capital_price,
      },
      { where: { id: id } }
    );
    return ingredient;
  } catch (error) {
    throw new Error(`${error}, traceback IngredientImportDao()`);
  }
}

// lay ra tat ca nguyen lieu trong kho
async function getAllIngredientDao() {
  try {
    const data = await db.Ingredient.findAll({});
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientDao()`);
  }
}

// findOne ingredient theo id
async function getOneIngredientByIdDao(id) {
  try {
    const kt = await db.Ingredient.findOne({
      where: { id: id },
    });
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getOneIngredientByIdDao()`);
  }
}
// findAll ingredient theo id
async function getAllIngredientByIdDao(id) {
  try {
    const kt = await db.IngredientOrderItem.findAll({
      where: { ingredient_order_id: id },
    });
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientByIdDao()`);
  }
}

// huy mot Ingredient_order by id
async function CancelIngredientOrderByIdDao(id) {
  try {
    const i_order = await db.Ingredient_Order.update(
      {
        activate: 1,
      },
      {
        where: { id: id },
      }
    );
    return i_order;
  } catch (error) {
    throw new Error(`${error}, traceback CancelIngredientOrderByIdDao()`);
  }
}

// un huy mot Ingredient_order by id
async function UnCancelIngredientOrderByIdDao(id) {
  try {
    const i_order = await db.Ingredient_Order.update(
      {
        activate: 0,
      },
      {
        where: { id: id },
      }
    );
    return i_order;
  } catch (error) {
    throw new Error(`${error}, traceback UnCancelIngredientOrderByIdDao()`);
  }
}
// findOne ingredient_order_item theo id
async function getOneIngredientOrderByIdDao(id) {
  try {
    const kt = await db.IngredientOrderItem.findAll({
      where: { ingredient_order_id: id },
    });
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getOneIngredientOrderByIdDao()`);
  }
}

// getAll Ingredient_order_item by id
async function getAllIngredientOrderByIdDao(id) {
  try {
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
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientOrderByIdDao()`);
  }
}
/// ingredient_order

/// get All ingredient theo tên Staff
async function getAllIngredientOrderStaff() {
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
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientOrderStaff()`);
  }
}

// danh sách hóa đơn vật tư đang hoạt động
async function getAllIngredientOrderStaffTrue() {
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
        activate: 0,
      },
      raw: true,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientOrderStaffTrue()`);
  }
}
// danh sách hóa đơn vật tư đã bị hủy
async function getAllIngredientOrderStaffFalse() {
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
        activate: 1,
      },
      raw: true,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientOrderStaffFalse()`);
  }
}

// getOneIngredientOrderByStaffId
async function getOneIngredientOrderByStaffId(id) {
  try {
    const ktstaffin = await db.Ingredient_Order.findOne({
      where: { staff_id: id },
    });
    return ktstaffin;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientOrderStaffFalse()`);
  }
}

// getAllOrderIngredientStaffDao()
async function getAllOrderIngredientStaffDao(id) {
  try {
    const data = await db.Ingredient_Order.findAll({
      where: {
        staff_id: id,
      },
      include: [
        // {
        //   model: db.Customer,
        //   as: "customer",
        //   attributes: ["fullname"],
        // },
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
    throw new Error(`${error}, traceback getAllOrderIngredientStaffDao()`);
  }
}
module.exports = {
  getOneIngredientByIdDao,
  IngredientImportDao,
  ImportIngredientOrderItemDao,
  ImportIngredientOrderDao,
  getAllIngredientDao,
  getAllIngredientByIdDao,
  CancelIngredientOrderByIdDao,
  UnCancelIngredientOrderByIdDao,
  getOneIngredientOrderByIdDao,
  getAllIngredientOrderByIdDao,
  getAllIngredientOrderStaff,
  getAllIngredientOrderStaffTrue,
  getAllIngredientOrderStaffFalse,
  getOneIngredientOrderByStaffId,
  getAllOrderIngredientStaffDao,
};
