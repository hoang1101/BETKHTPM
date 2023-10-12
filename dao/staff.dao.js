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
// update profile staff by admin
async function updateProfileByAdminDao(
  fullname,
  gender,
  email,
  phone,
  birthday,
  address,
  roleId,
  id
) {
  try {
    const user = await db.Staff.update(
      {
        fullname: fullname,
        gender: gender,
        email: email,
        phone: phone,
        birthday: birthday,
        address: address,
        roleId: roleId,
      },
      {
        where: { id: id },
      }
    );
    return user;
  } catch (error) {
    `Error: ${error}, traceback at updateProfileByAdminDao function at staff.dao.js file`;
  }
}
// lock tai khoản khách hàng
async function lockCustomerDao(id) {
  try {
    const lock = await db.Customer.update(
      {
        isAcctive: 1,
      },
      {
        where: { id: id },
      }
    );
    return lock;
  } catch (error) {
    `Error: ${error}, traceback at lockCustomerDao function at staff.dao.js file`;
  }
}

//unlock
// lock tai khoản khách hàng
async function unLockCustomerDao(id) {
  try {
    const lock = await db.Customer.update(
      {
        isAcctive: 0,
      },
      {
        where: { id: id },
      }
    );
    return lock;
  } catch (error) {
    `Error: ${error}, traceback at unLockCustomerDao function at staff.dao.js file`;
  }
}
module.exports = {
  findOneStaff,
  findOneStaffEmail,
  searchStaffDao,
  updateProfileByAdminDao,
  unLockCustomerDao,
  lockCustomerDao,
};
