const { createProduct } = require("../controllers/staff");

const router = require("express").Router();

router.post("/create", createProduct);

module.exports = router;
