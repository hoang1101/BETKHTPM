const db = require("../models");
async function createRecipe(recipre) {
  try {
    for (let i of recipre) {
      const recipe = await db.Recipre.create({
        product_id: i.product_id,
        ingredient_id: i.ingredient_id,
        quantity: i.quantity,
      });
    }
  } catch (error) {
    throw new Error(`${err}, traceback createRecipe()`);
  }
}

module.exports = { createRecipe };
