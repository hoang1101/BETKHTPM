const { findOneStaff } = require("../dao/staff.dao");
const db = require("../models");
const { ReT, ReE } = require("../utils/util.service");

async function CheckPhone(phone) {
  try {
    const response = await db.Customer.findOne({
      where: {
        phone,
      },
    });
    const response1 = await db.Staff.findOne({
      where: {
        phone,
      },
    });
    if (response1 && response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return ReE(res, error);
  }
}
async function CheckEmail(email) {
  try {
    const response = await db.Customer.findOne({
      where: {
        email,
      },
    });
    const response1 = await db.Staff.findOne({
      where: {
        email,
      },
    });
    if (response1 && response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return ReE(res, error);
  }
}

module.exports = {
  CheckPhone,
  CheckEmail,
};
