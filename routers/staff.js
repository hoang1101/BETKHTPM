const {
  editProfileNhanVien,
  editProfileByAdmin,
  LockCuatomer,
  UnLockCustomer,
  FindAcountCustomer,
} = require("../controllers/admin.controller");
const {
  ImportIngredient,
  CreateMeasure,
  EditMeasure,
  DeleteMeasure,
  getAllMeasure,
  ImportIngredientOrder,
  CreateIngredient,
  EditIngredient,
  DeleteIngredient,
  GetAllIngredient,
  GetAllIngredientOrderItem,
  GetAllIngredientOrderItemById,
  GetAllIngredientOrder,
} = require("../controllers/ingredient.controller");
const {
  CreatePromotion,
  editPromotion,
  deletePromotion,
  GetAllPromotion,
  GetAllPromotionNow,
  GetAllPromotionEnd,
  GetAllPromotionRegister,
} = require("../controllers/promotion.controller");
const { getAllRole, getRoleById } = require("../controllers/role.controller");
const {
  createProduct,
  deleteProduct,
  AllOrder,
  AcceptOrder,
  CancleOrder,
  editProduct,
  detailOrderByid,
  LockAccount,
  UnLockAccount,
  FindAcountStaff,
  deleteStaff,
  ViewProfile,
  EditAcount,
  changePasswordStaff,
  FindOrder,
  GetAllRecipe,
} = require("../controllers/staff.controller");
const {
  getAllIngredient,
  statisticalProduct,
  statisticalRevenueProduct,
  statisticalShipper,
  statisticalShipperRevenue,
  statisticalRevenueProductDate,
  getCustomerOrder,
} = require("../controllers/statistical.controller");

const router = require("express").Router();

// staff
router.get("/view-profile/:id", ViewProfile);
router.put("/edit-myif-staff/:id", EditAcount);
router.put("/chang-pw-staff/:user_id", changePasswordStaff);

router.post("/create", createProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
// quan ly kinh doanh

router.get("/all-order", AllOrder);
router.put("/accept-order/:id", AcceptOrder);
router.put("/cancle-order/:id", CancleOrder);
router.get("/orderById/:id", detailOrderByid);

router.get("/search-order", FindOrder);

//thong ke
router.get("/statistical", statisticalProduct);
router.get("/statistical-revenue", statisticalRevenueProduct);
// thong ke doan thu theo ngay tuy chon
router.post("/statistical-revenue-date", statisticalRevenueProductDate);
router.get("/customer-top", getCustomerOrder);

// quản lý nhân viên

router.get("/all-role", getAllRole);
//khóa tài khoản
router.put("/lock-account", LockAccount);
router.put("/unlock-account", UnLockAccount);
// tim kiem nhan vien
router.get("/find-acount", FindAcountStaff);
// xoa nhan vien
router.delete("/delete-acount/:id", deleteStaff);
// chinh sua thong tin nhan vien
router.put("/edit-acount", editProfileByAdmin);
// xem thong tin ca nhan
// lay role theo id
router.get("/get-role-id/:roleId", getRoleById);

// quan ly tai khoan khach hang
router.put("/lock-account-customer", LockCuatomer);
router.put("/unlock-account-customer", UnLockCustomer);
router.get("/find-acount-customer", FindAcountCustomer);

// tao khuyen mai
router.post("/create-promotion", CreatePromotion);
router.put("/edit-promotion", editPromotion);
router.delete("/delete-promotion/:id", deletePromotion);
router.get("/all-promotion", GetAllPromotionNow);
router.get("/all-promotion-end", GetAllPromotionEnd);
router.get("/all-promotion-register", GetAllPromotionRegister);

// quan ly vat tu don vi
router.post("/create-measure", CreateMeasure);
router.put("/edit-measure/:id", EditMeasure);
router.delete("/delete-measure/:id", DeleteMeasure);
router.get("/all-measure", getAllMeasure);

// quan ly vat tu
router.post("/create-ingredient", CreateIngredient);
router.put("/edit-ingredient", EditIngredient);
router.delete("/delete-ingredient/:id", DeleteIngredient);
router.get("/all-ingredient", GetAllIngredient);

// hoa don nhap
router.post("/import-ingredient", ImportIngredientOrder);
router.get("/all-i_order_i/:id", GetAllIngredientOrderItemById);
router.get("/all-order_item", GetAllIngredientOrder);

//cong thuc
router.get("/get-recipe/:product_id", GetAllRecipe);

module.exports = router;
