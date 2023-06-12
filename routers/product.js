const { getAllProduct } = require("../controllers/product");

const router = require("express").Router();

router.get("/all", getAllProduct);

module.exports = router;
