const db = require("../models");

async function findOneUser(phone) {
  try {
    const response = await db.Customer.findOne({
      where: {
        phone,
      },
      raw: true,
    });

    return response;
  } catch (error) {
    throw new Error(`${error}, traceback findOneUser()`);
  }
}

module.exports = {
  findOneUser,
};
