const {
  loginCustomer,
  loginStaff,
  register,
  registerStaff,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login-customer", loginCustomer);
router.post("/login-staff", loginStaff);
router.post("/register", register);
router.post("/register-staff", registerStaff);

module.exports = router;
