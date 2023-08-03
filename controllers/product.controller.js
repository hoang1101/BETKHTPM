const { Op } = require("sequelize");
const { getAllProductdao, searchProductDao } = require("../dao/product.dao");
const { getRecipreByIdDao, UpdateRecipeDao } = require("../dao/recipre.dao");
const { SS, ReE, TT, ReS } = require("../utils/util.service");
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

exports.SearchProduct = async (req, res) => {
  try {
    const page = req.query?.page * 1;
    const limit = req.query?.limit * 1;
    const search = req.query?.search;
    let condition = {};
    let response = {};
    if (page || limit || search) {
      if (!page || !limit) return ReE(res, 400, "Missing Data Field");
      if (search) {
        condition = {
          ...condition,
          ...{
            name: { [Op.like]: `%${search}%` },
          },
        };
      }
      const { rows, count } = await searchProductDao(
        condition,
        page - 1,
        limit
      );
      response.count = count;
      response.product = rows;
    }
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
