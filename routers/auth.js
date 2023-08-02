const {
  loginCustomer,
  loginStaff,
  register,
  registerStaff,
  sendEmailOTP,
  VerifyOTP,
  ResetPassword,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login-customer", loginCustomer);
router.post("/login-staff", loginStaff);
router.post("/register", register);
router.post("/register-staff", registerStaff);
router.post("/send-mail", sendEmailOTP);
router.post("/verify-otp", VerifyOTP);
router.patch("/reset-password", ResetPassword);

module.exports = router;
