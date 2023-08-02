const router = require("express").Router();

const {
  checkOut,
  getAllOrderById,
  getAllOrderByIdTrue,
  getAllOrderByIdFalse,
  editProfile,
  changePassword,
} = require("../controllers/customer.controller.");
const {
  getEvaluateCustomer,
  getEvaluateCustomerDone,
  DanhGiaSanPham,
} = require("../controllers/evaluate.controller");

router.post("/checkOut", checkOut);
router.get("/AllOrder/:customer_id", getAllOrderById);
router.get("/AllOrderT/:customer_id", getAllOrderByIdTrue);
router.get("/AllOrderF/:customer_id", getAllOrderByIdFalse);
router.put("/update-profile/:id", editProfile);
router.put("/change-password/:user_id", changePassword);

/// dánh giá
router.post("/evaluate-customer", DanhGiaSanPham);

router.get("/allOrderItem", getEvaluateCustomer);
router.get("/allOrderItemDone", getEvaluateCustomerDone);
module.exports = router;
