const {
  getAllProduct,
  getRecipreById,
  updateRecipe,
  PriceRecipe,
} = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/all", getAllProduct);
router.get("/getPriceRecipe", PriceRecipe);
router.get("/recipre/:product_id", getRecipreById);
router.put("/recipre-update/:product_id", updateRecipe);

module.exports = router;
