const { Op } = require("sequelize");
const {
  getAllProductdao,
  searchProductDao,
  lockProductDao,
  unLockProductdao,
} = require("../dao/product.dao");
const { getRecipreByIdDao, UpdateRecipeDao } = require("../dao/recipre.dao");
const { SS, ReE, TT, ReS } = require("../utils/util.service");
const db = require("../models");
const config = require("../config/config");
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
    // console.log(product_id);
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
    const activate = req.query?.activate;
    let condition = {
      activate: { [Op.like]: `%${activate}%` },
    };
    let response = {};
    let counts = 0;
    if (page || limit || search) {
      if (!page || !limit)
        return ReE(res, 200, config.message.MISSING_DATA_INPUT);
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
      counts = count;
      response = rows;
    }
    return res.status(200).json({
      success: true,
      count: counts,
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

// dong mo 1 san pham

exports.LockProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await lockProductDao(id);
    if (data) {
      return ReS(res, 200, config.message.UPDATE_SUCCESS);
    } else {
      return ReF(res, 200, config.message.UPDATE_FALSE);
    }
  } catch (error) {
    return ReE(res, error);
  }
};

exports.UnLockProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await unLockProductdao(id);
    if (data) {
      return ReS(res, 200, config.message.UPDATE_SUCCESS);
    } else {
      return ReF(res, 200, config.message.UPDATE_FALSE);
    }
  } catch (error) {
    return ReE(res, error);
  }
};
