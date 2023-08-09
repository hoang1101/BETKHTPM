const db = require("../models");
async function createRecipe(recipre) {
  try {
    for (let i of recipre) {
      const recipe = await db.Recipe.create({
        product_id: i.product_id,
        ingredient_id: i.ingredient_id,
        quantity: i.quantity,
      });
    }
  } catch (error) {
    throw new Error(`${error}, traceback createRecipe()`);
  }
}

async function getRecipreByIdDao(product_id) {
  try {
    const data = await db.Recipe.findAll({
      where: { product_id: product_id },
      include: [{ model: db.Ingredient, as: "ingredient" }],
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getRecipreById()`);
  }
}

async function UpdateRecipeDao(product_id, recipe) {
  try {
    const data = await db.Recipe.destroy({
      where: { product_id: product_id },
    });
    for (let i of recipe) {
      const data = await db.Recipe.create({
        product_id: product_id,
        ingredient_id: i.ingredient_id,
        quantity: i.quantity,
      });
    }
  } catch (error) {
    throw new Error(`${error}, traceback UpdateRecipeDao()`);
  }
}
module.exports = { createRecipe, getRecipreByIdDao, UpdateRecipeDao };
