const db = require("../models");
const { ReT, ReE, ReF } = require("../utils/util.service");

exports.getAllRole = async (req, res) => {
  try {
    const role = await db.Role.findAll({});
    return ReT(res, role, 200);
  } catch (error) {
    return ReE(res, error);
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await db.Role.findOne({
      where: {
        id: roleId,
      },
    });
    if (role) {
      return ReT(res, role, 200);
    } else {
      return ReF(res, 400, "Fail !");
    }
  } catch (error) {
    return ReE(res, error);
  }
};
