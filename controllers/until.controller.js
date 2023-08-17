const { findOneStaff } = require("../dao/staff.dao");
const db = require("../models");
const { ReT, ReE } = require("../utils/util.service");

async function CheckPhone(id, phone) {
  try {
    const response1 = await db.Staff.findOne({
      where: {
        phone,
      },
    });
    console.log(response1.id == id);
    if (response1.id == id) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(`${error}, traceback CheckPhone()`);
  }
}
async function CheckEmail(id, email) {
  try {
    const response1 = await db.Staff.findOne({
      where: {
        email,
      },
    });
    if (response1) {
      if (response1.id == id) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(`${error}, traceback CheckEmail()`);
  }
}

async function CheckPhoneCustomer(id, phone) {
  try {
    const response1 = await db.Customer.findOne({
      where: {
        phone,
      },
    });
    console.log(response1.id);
    if (response1.id == id) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(`${error}, traceback CheckPhoneCustomer()`);
  }
}
async function CheckEmailCustomer(id, email) {
  try {
    const response1 = await db.Customer.findOne({
      where: {
        email,
      },
    });
    if (response1) {
      if (response1.id == id) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(`${error}, traceback CheckEmailCustomer()`);
  }
}

module.exports = {
  CheckPhone,
  CheckEmail,
  CheckEmailCustomer,
  CheckPhoneCustomer,
};
