const {} = require("../controllers/product");
const { createProduct } = require("../dao/product.dao");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, descript } = req.body;
    const product = await createProduct(name, price, image, descript);
    if (product) {
      return res.status(200).json({
        success: true,
        response: product,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Loi khong tao thanh cong!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const id = req.params;
    const { name, price, image, descript } = req.body;
    const product = await this.editProduct(id, name, price, image, descript);
    if (product) {
      return res.status(200).json({
        success: true,
        response: product,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Loi khong tao thanh cong!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
