const db = require("../models");

// lấy ra tất cả role
async function getAllRoleDao() {
  try {
    const role = await db.Role.findAll({});
    return role;
  } catch (error) {
    throw new Error(`${error}, traceback getAllRoleDao()`);
  }
}

// lấy tên role by id
async function getRoleByIdDao(roleId) {
  try {
    const role = await db.Role.findOne({
      where: {
        id: roleId,
      },
    });
    return role;
  } catch (error) {
    throw new Error(`${error}, traceback getRoleByIdDao()`);
  }
}

module.exports = {
  getAllRoleDao,
  getRoleByIdDao,
};
