const { ImportIngredient } = require("../controllers/ingredient");
const {
  createProduct,
  deleteProduct,
  AllOrder,
  AcceptOrder,
  CancleOrder,
} = require("../controllers/staff");
const { getAllIngredient } = require("../controllers/statistical");

const router = require("express").Router();

router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
// all order
router.get("/all-order", AllOrder);
router.put("/accept-order/:id", AcceptOrder);
router.put("/cancle-order/:id", CancleOrder);

// ingredient

router.post("/create-ingre", ImportIngredient);
router.get("/all-ingre", getAllIngredient);

//

module.exports = router;
