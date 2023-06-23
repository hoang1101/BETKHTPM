const {
  getAllShipperDao,
  findShipperDao,
  createShipperDao,
  deleteShipperDao,
  editShipperDao,
} = require("../dao/shipper.dao");
const { ReS, SS } = require("../utils/util.service");

exports.getAllShipper = async (req, res) => {
  try {
    const data = await getAllShipperDao();
    return ReS(res, data, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
exports.createShipper = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await createShipperDao(name);
    return ReS(res, data, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.deleteShipper = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteShipperDao(id);
    // console.log(data);
    return res.status(200).json({
      success: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

exports.editShipper = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await editShipperDao(id, name);
    return ReS(res, data, 200);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
