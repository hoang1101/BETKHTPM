const {
  createUser,
  getUserByAddress,
  loginSocial,
  verifySocial,
} = require("../controllers/user.constroller");

const router = require("express").Router();

router.post("/createUser", createUser);
router.get("/", getUserByAddress);
router.put("/", loginSocial);
router.post("/verifySocial", verifySocial);

module.exports = router;
