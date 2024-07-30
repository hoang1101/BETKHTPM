const {
  createUser,
  getUserByAddress,
  loginSocial,
  verifySocial,
  getSocialByAddress,
} = require("../controllers/user.constroller");

const router = require("express").Router();

router.post("/createUser", createUser);
router.get("/", getUserByAddress);
router.put("/", loginSocial);
router.post("/verifySocial", verifySocial);
router.get("/social", getSocialByAddress);

module.exports = router;
