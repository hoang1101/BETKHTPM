const router = require("express").Router();

const customerController = require("../controllers/customer")

router.post("/checkOut",customerController.checkOut)

module.exports = router;