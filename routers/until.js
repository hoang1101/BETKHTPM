const { getEvaluateProduct } = require("../controllers/evaluate.controller");
const { SearchProduct } = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/getAllProduct", SearchProduct);

router.get("/danhgia/:id_product", getEvaluateProduct);

module.exports = router;
