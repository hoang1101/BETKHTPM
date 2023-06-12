const db = require("../models");

async function findOneStaff(phone) {
  try {
    const response = await db.Customer.findOne({
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

module.exports = {
  findOneStaff,
};
