const {
  createProduct,
  deleteProduct,
  AllOrder,
} = require("../controllers/staff");

const router = require("express").Router();

router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
// all order
router.get("/all-order", AllOrder);

module.exports = router;
