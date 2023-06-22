const db = require("../models");
const {
  ImportIngredientDao,
  UpdateImportIngredientDao,
} = require("../dao/ingredient_order.dao");

exports.ImportIngredient = async (req, res) => {
  try {
    const { staff_id, ingredient_id, price, quantity } = req.body;
    const data = ImportIngredientDao(staff_id, ingredient_id, price, quantity);
    // const data1 = UpdateImportIngredientDao(ingredient_id, quantity);
    if (data) {
      return res.status(200).json({
        success: true,
        // response: data,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Loi khong tao thanh cong!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
