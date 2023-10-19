const config = require("../config/config");
const { getAllRoleDao, getRoleByIdDao } = require("../dao/role.dao");
const db = require("../models");
const { ReT, ReE, ReF } = require("../utils/util.service");

exports.getAllRole = async (req, res) => {
  try {
    const role = await getAllRoleDao();
    return ReT(res, role, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await getRoleByIdDao(roleId);
    if (role) {
      return ReT(res, role, 200);
    } else {
      return ReF(res, 200, config.message.ROLE_ERROR);
    }
  } catch (error) {
    return ReE(res, error);
  }
};

const moment = require("moment");

exports.CheckDate = async (req, res) => {
  try {
    var moment = require("moment");
    var ngayGioHienTai = moment(); // Tạo một đối tượng Moment hiện tại
    console.log(
      "Ngày và giờ hiện tại: " + ngayGioHienTai.format("YYYY-MM-DD HH:mm:ss")
    );
    console.log(data);
    return ReT(res, data, 200);
  } catch (error) {
    return ReE(res, error);
  }
};
