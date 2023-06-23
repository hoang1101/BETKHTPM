const { ImportIngredient } = require("../controllers/ingredient.controller");
const {
  getAllShipper,
  createShipper,
  deleteShipper,
  editShipper,
} = require("../controllers/shipper.controller");
const {
  createProduct,
  deleteProduct,
  AllOrder,
  AcceptOrder,
  CancleOrder,
  editProduct,
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

// ingredient

router.post("/create-ingre", ImportIngredient);
router.get("/all-ingre", getAllIngredient);

//thong ke
router.get("/statistical", statisticalProduct);
router.get("/statistical-revenue", statisticalRevenueProduct);
router.get("/statistical-shipper", statisticalShipper);
router.get("/statistical-shipper-revenue", statisticalShipperRevenue);

// shipper

router.get("/shipper", getAllShipper);
router.post("/create-shipper", createShipper);
router.delete("/delete-shipper/:id", deleteShipper);
router.put("/edit-shipper/:id", editShipper);

module.exports = router;
