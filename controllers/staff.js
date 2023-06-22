const {} = require("../controllers/product");
const {
  AllOrderDao,
  AcceptOrderDao,
  CancleOrderDao,
} = require("../dao/order.dao");
const {
  createProductdao,
  editProductdao,
  deleteProductdao,
  getProductdao,
} = require("../dao/product.dao");
const { SS } = require("../utils/util.service");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, descript } = req.body;
    const product = await createProductdao(name, price, image, descript);
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
    const product = await editProductdao(id, name, price, image, descript);
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

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await getProductdao(id);
    if (!product) {
      return ReE(res, 400, "Khong ton tai");
    } else {
      const data = await deleteProductdao(id);
      return res.status(200).json({
        success: true,
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

// danh sach don hang chua xu li

exports.AllOrder = async (req, res) => {
  try {
    // const { order_id, status } = req.params;

    const order = await AllOrderDao();
    return SS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
exports.AcceptOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { staff_id } = req.body;

    const order = await AcceptOrderDao(id, staff_id);
    return SS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
exports.CancleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { staff_id } = req.body;

    const order = await CancleOrderDao(id, staff_id);
    return SS(res, order, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

// danh sach don hang
