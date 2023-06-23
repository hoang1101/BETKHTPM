const router = require("express").Router();

const customerController = require("../controllers/customer.controller.");

router.post("/checkOut", customerController.checkOut);

module.exports = router;
