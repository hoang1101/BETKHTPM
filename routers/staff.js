const { ImportIngredient } = require("../controllers/ingredient");
const {
  createProduct,
  deleteProduct,
  AllOrder,
  AcceptOrder,
  CancleOrder,
  editProduct,
} = require("../controllers/staff");
const {
  getAllIngredient,
  statisticalProduct,
  statisticalRevenueProduct,
} = require("../controllers/statistical");

const router = require("express").Router();

router.post("/create", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
// all order
router.get("/all-order", AllOrder);
router.put("/accept-order/:id", AcceptOrder);
router.put("/cancle-order/:id", CancleOrder);

// ingredient

router.post("/create-ingre", ImportIngredient);
router.get("/all-ingre", getAllIngredient);

//thong ke
router.get("/statistical", statisticalProduct);
router.get("/statistical-revenue", statisticalRevenueProduct);

module.exports = router;
