const db = require("../models");
// tạo công thức cho sản phẩm
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

// lấy ra công thức theo Id của sản phẩm
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

// chỉnh sửa công thức sản phẩm va tien hanh cap nhat gia san pham
async function UpdateRecipeDao(product_id, recipe) {
  try {
    const data = await db.Recipe.destroy({
      where: { product_id: product_id },
    });

    let sum = 0;
    for (let j of recipe) {
      // console.log(j.ingredient_id);
      const data1 = await db.Ingredient.findOne({
        where: { id: j.ingredient_id },
      });
      sum = sum + j.quantity * data1.capital_price;
    }
    let product = await db.Product.update(
      {
        price: sum + sum * 0.3,
        capital_price: sum,
      },
      {
        where: { id: product_id },
      }
    );

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

// lấy ra những nguyên liệu liên quan trong hóa đơn và tiến hành cập nhật giá mới cho những sản phẩm liên quan
async function UpdatePriceProductDao(ingredient_id) {
  try {
    // tim kiem nguyen lieu
    const recipe = await db.Recipe.findAll({
      where: { ingredient_id: ingredient_id },
    });
    // tìm kiếm sản phẩm liên quan đến nguyên liệu đó
    let check;
    for (let i of recipe) {
      let repice_product = await db.Recipe.findAll({
        where: { product_id: i.product_id },
      });
      let sum = 0;
      for (let i of repice_product) {
        const data = await db.Ingredient.findOne({
          where: { id: i.ingredient_id },
        });
        sum = sum + i.quantity * data.capital_price;
      }
      // console.log(sum);
      let product = await db.Product.update(
        {
          capital_price: sum,
        },
        {
          where: { id: i.product_id },
        }
      );
      check = product;
    }
    if (check) return true;
    else return false;
  } catch (error) {
    throw new Error(`${error}, traceback UpdatePriceProductDao()`);
  }
}

module.exports = {
  createRecipe,
  getRecipreByIdDao,
  UpdateRecipeDao,
  UpdatePriceProductDao,
};
