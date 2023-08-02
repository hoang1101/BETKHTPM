const { ImportIngredient } = require("../controllers/ingredient.controller");
const {
  createProduct,
  deleteProduct,
  AllOrder,
  AcceptOrder,
  CancleOrder,
  editProduct,
  detailOrderByid,
} = require("../controllers/staff.controller");
const {
  getAllIngredient,
  statisticalProduct,
  statisticalRevenueProduct,
  statisticalShipper,
  statisticalShipperRevenue,
} = require("../controllers/statistical.controller");

const router = require("express").Router();

router.post("/create", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
// all order

router.get("/all-order", AllOrder);
router.put("/accept-order/:id", AcceptOrder);
router.put("/cancle-order/:id", CancleOrder);
router.get("/orderById/:id", detailOrderByid);
// ingredient

router.post("/create-ingre", ImportIngredient);
router.get("/all-ingre", getAllIngredient);

//thong ke
router.get("/statistical", statisticalProduct);
router.get("/statistical-revenue", statisticalRevenueProduct);
router.get("/statistical-shipper", statisticalShipper);
router.get("/statistical-shipper-revenue", statisticalShipperRevenue);

module.exports = router;
