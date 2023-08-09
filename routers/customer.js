const router = require("express").Router();

const {
  checkOut,
  getAllOrderById,
  getAllOrderByIdTrue,
  getAllOrderByIdFalse,
  editProfile,
  changePassword,
  ViewProfileCustomer,
  checkIngredient,
  CustomerCancleOrder,
} = require("../controllers/customer.controller.");
const {
  getEvaluateCustomer,
  getEvaluateCustomerDone,
  DanhGiaSanPham,
  EditDanhGiaSanPham,
} = require("../controllers/evaluate.controller");

router.post("/checkOut", checkOut);
router.get("/AllOrder/:customer_id", getAllOrderById);
router.get("/AllOrderT/:customer_id", getAllOrderByIdTrue);
router.get("/AllOrderF/:customer_id", getAllOrderByIdFalse);
router.put("/update-profile/:id", editProfile);
router.put("/change-password/:user_id", changePassword);

/// dánh giá
router.post("/evaluate-customer", DanhGiaSanPham);
router.put("/evaluate-edit/:id", EditDanhGiaSanPham);

/// những sản phảm đã mua nhưng chua đánh giá
router.get("/allOrderItemNotRate/:customer_id", getEvaluateCustomer);
router.get("/allOrderItemDone/:customer_id", getEvaluateCustomerDone);

// xem thong tin ca nhan
router.get("/view-myif/:id", ViewProfileCustomer);

// check order-ingredient
router.post("/check-order", checkIngredient);

// customer huy don
router.put("/cancle-order/:id", CustomerCancleOrder);
module.exports = router;
