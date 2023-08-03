const { CheckPhone, CheckEmail } = require("../controllers/until.controller");
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

async function findOneUserEmail(email) {
  try {
    const response = await db.Customer.findOne({
      where: {
        email,
      },
      raw: true,
    });

    return response;
  } catch (error) {
    throw new Error(`${error}, traceback findOneUserEmail()`);
  }
}

async function getAllOrderByIdDao(customer_id) {
  try {
    const data = await db.Orders.findAll({
      where: {
        customer_id: customer_id,
        status: null,
      },
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllOrderByIdDao()`);
  }
}

async function getAllOrderByIdDaoTrue(customer_id) {
  try {
    const data = await db.Orders.findAll({
      where: {
        customer_id: customer_id,
        status: 1,
      },
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllOrderByIdDaoTrue()`);
  }
}

async function getAllOrderByIdDaoFalse(customer_id) {
  try {
    const data = await db.Orders.findAll({
      where: {
        customer_id: customer_id,
        status: 0,
      },
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllOrderByIdDaoFalse()`);
  }
}

async function editProfileDao({
  id,
  fullname,
  email,
  phone,
  address,
  gender,
  birthday,
}) {
  try {
    const kt = await CheckPhone(phone);
    const ktemail = await CheckEmail(email);
    if (kt) {
      return ReF(res, 400, "So dien thoai bi trung !");
    } else if (ktemail) {
      return ReF(res, 400, "Email bi trung !");
    } else {
      const user = await db.Customer.update(
        {
          fullname: fullname,
          gender: gender,
          email: email,
          phone: phone,
          birthday: birthday,
          address: address,
        },
        {
          where: { id: id },
        }
      );
      if (user) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw new Error(`${error}, traceback editProfileDao()`);
  }
}

async function searchCustomerDao(condition, page, limit) {
  try {
    const { rows, count } = await db.Customer.findAndCountAll({
      where: condition,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      offset: page * limit,
      limit: limit,
    });

    return { rows, count };
  } catch (error) {
    throw new Error(
      `Error: ${error}, traceback at searchCustomerDao function at customer.dao.js file`
    );
  }
}

module.exports = {
  findOneUser,
  findOneUserEmail,
  getAllOrderByIdDao,
  getAllOrderByIdDaoFalse,
  getAllOrderByIdDaoTrue,
  editProfileDao,
  searchCustomerDao,
};
