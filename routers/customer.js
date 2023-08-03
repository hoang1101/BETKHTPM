const router = require("express").Router();

const {
  checkOut,
  getAllOrderById,
  getAllOrderByIdTrue,
  getAllOrderByIdFalse,
  editProfile,
  changePassword,
  ViewProfileCustomer,
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
router.get("/allOrderItemNotRate", getEvaluateCustomer);
router.get("/allOrderItemDone", getEvaluateCustomerDone);

// xem thong tin ca nhan
router.get("/view-myif/:id", ViewProfileCustomer);
module.exports = router;
