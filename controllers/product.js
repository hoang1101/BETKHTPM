const { getAllProductdao } = require("../dao/product.dao");
const { SS, ReE, TT } = require("../utils/util.service");
exports.getAllProduct = async (req, res) => {
  try {
    const data = await getAllProductdao();
    return SS(res, data);
  } catch (error) {
    return ReE(res, error);
  }
};
