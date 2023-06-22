const db = require("../models");
const { getAllIngredientDao } = require("../dao/ingredient_order.dao");
const { ReE, SS } = require("../utils/util.service");

exports.getAllIngredient = async (req, res) => {
  try {
    const data = await getAllIngredientDao();
    return SS(res, data);
  } catch (error) {
    return ReE(res, error);
  }
};
