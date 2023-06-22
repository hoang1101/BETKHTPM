const db = require("../models");
async function ImportIngredientDao(staff_id, ingredient_id, price, quantity) {
  try {
    const ingre = await db.Ingredient_Order.create({
      staff_id: staff_id,
      //   ingredient_id: ingredient_id,
      price: price,
      quantity: quantity,
    });
    return ingre;
  } catch (error) {
    throw new Error(`${error}, traceback ImportIngredientDao()`);
  }
}

async function UpdateImportIngredientDao(ingredient_id, quantity) {
  try {
    const findid = await db.Ingredient.findOne({
      where: { id: ingredient_id },
    });
    const quantity_old = findid.quantity;
    const data = await db.Ingredient.update(
      {
        quantity: quantity + quantity_old,
      },
      { where: { id: ingredient_id } }
    );
  } catch (error) {
    throw new Error(`${error}, traceback UpdateImportIngredientDao()`);
  }
}

async function getAllIngredientDao() {
  try {
    const data = await db.Ingredient.findAll({});
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllIngredientDao()`);
  }
}

module.exports = {
  ImportIngredientDao,
  UpdateImportIngredientDao,
  getAllIngredientDao,
};
