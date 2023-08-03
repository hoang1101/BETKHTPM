const {
  editProfileNhanVien,
  editProfileByAdmin,
} = require("../controllers/admin.controller");
const { ImportIngredient } = require("../controllers/ingredient.controller");
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
} = require("../controllers/staff.controller");
const {
  getAllIngredient,
  statisticalProduct,
  statisticalRevenueProduct,
  statisticalShipper,
  statisticalShipperRevenue,
} = require("../controllers/statistical.controller");

const router = require("express").Router();

// staff
router.get("/view-profile/:id", ViewProfile);
router.put("/edit-myif-staff/:id", EditAcount);
router.put("/chang-pw-staff/:user_id", changePasswordStaff);

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
router.get("/get-role-id", getRoleById);

module.exports = router;
