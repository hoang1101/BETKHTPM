const db = require("../models");

async function findOneStaff(phone) {
  try {
    const response = await db.Staff.findOne({
      where: {
        phone,
      },
      raw: true,
    });

    return response;
  } catch (error) {
    throw new Error(`${error}, traceback findOneStaff()`);
  }
}
async function findOneStaffEmail(email) {
  try {
    const response = await db.Staff.findOne({
      where: {
        email,
      },
      raw: true,
    });

    return response;
  } catch (error) {
    throw new Error(`${error}, traceback findOneStaffEmail()`);
  }
}
async function searchStaffDao(condition, page, limit) {
  try {
    const { rows, count } = await db.Staff.findAndCountAll({
      where: condition,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      raw: true,
      offset: page * limit,
      limit: limit,
    });

    return { rows, count };
  } catch (error) {
    throw new Error(
      `Error: ${error}, traceback at searchStaffDao function at staff.dao.js file`
    );
  }
}
module.exports = {
  findOneStaff,
  findOneStaffEmail,
  searchStaffDao,
};
