const {
  getAllProduct,
  getRecipreById,
  updateRecipe,
} = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/all", getAllProduct);
router.get("/recipre/:product_id", getRecipreById);
router.put("/recipre-update/:product_id", updateRecipe);

module.exports = router;
