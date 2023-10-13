const db = require("../models");

async function getAllIngredientInDayDao() {
  try {
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientInDayDao()`);
  }
}

//ingredient finđAll
async function getAllIngredientDao() {
  try {
    const ingredient = await db.Ingredient.findAll({});
    return ingredient;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientDao()`);
  }
}

// find ingredient by name
async function getIngredientByNameDao(name) {
  try {
    const kt = await db.Ingredient.findOne({
      where: { name: name },
    });
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getIngredientByNameDao()`);
  }
}

// tạo tên nguyên liệu
async function createIngredientDao(name, measure_id) {
  try {
    const data = await db.Ingredient.create({
      name: name,
      measure_id: measure_id,
      quantity: 0,
      capital_price: 0,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback createIngredientDao()`);
  }
}
// cập nhật nguyên liệu
async function updateIngredientDao(name, measure_id, id) {
  try {
    const data = await db.Ingredient.update(
      {
        name: name,
        measure_id: measure_id,
      },
      { where: { id: id } }
    );
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback updateIngredientDao()`);
  }
}

// xóa nguyên liệu
async function deleteIngredientDao(id) {
  try {
    const data = await db.Ingredient.destroy({
      where: { id: id },
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback deleteIngredientDao()`);
  }
}

//ingredient+measure finđAll
async function getAllIngredientMeasureDao() {
  try {
    const ingredient = await db.Ingredient.findAll({
      include: [
        {
          model: db.Measure,
          as: "measure",
        },
      ],
      raw: true,
    });
    return ingredient;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientMeasureDao()`);
  }
}

module.exports = {
  getAllIngredientInDayDao,
  getAllIngredientDao,
  getIngredientByNameDao,
  createIngredientDao,
  updateIngredientDao,
  deleteIngredientDao,
};
