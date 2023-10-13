const db = require("../models");

// thống kê khách hàng top
async function getCustomerOrderTopDao() {
  try {
    const data = await db.Customer.findAll({
      attributes: [
        "id",
        "fullname",
        [db.sequelize.fn("COUNT", db.sequelize.col("Orders.id")), "orderCount"],
      ], // Chỉ lấy trường id và name của khách hàng
      include: [
        {
          model: db.Orders,
          as: "orders",
          attributes: [],
        },
      ],
      group: ["Customer.id"], // Gom nhóm theo id của khách hàng
      raw: true, // Trả về dữ liệu dưới dạng plain object
      nest: true, // Lồng dữ liệu khách hàng trong một object
      order: [[db.sequelize.literal("orderCount"), "DESC"]], // Sắp xếp giảm dần theo orderCount
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getCustomerOrderTopDao()`);
  }
}
module.exports = { getCustomerOrderTopDao };
