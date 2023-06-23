const { getAllProductdao } = require("../dao/product.dao");
const { getRecipreByIdDao, UpdateRecipeDao } = require("../dao/recipre.dao");
const { SS, ReE, TT } = require("../utils/util.service");
exports.getAllProduct = async (req, res) => {
  try {
    const data = await getAllProductdao();
    return SS(res, data);
  } catch (error) {
    return ReE(res, error);
  }
};

exports.getRecipreById = async (req, res) => {
  try {
    const { product_id } = req.params;
    const data = await getRecipreByIdDao(product_id);
    return SS(res, data);
  } catch (error) {
    return ReE(res, error);
  }
};
exports.updateRecipe = async (req, res) => {
  try {
    const { product_id } = req.params;
    console.log(product_id);
    const recipe = req.body.recipe;
    const dataupdate = await UpdateRecipeDao(product_id, recipe);
    return SS(res, dataupdate);
  } catch (error) {
    return ReE(res, error);
  }
};
