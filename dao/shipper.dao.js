const db = require("../models");

async function getAllShipperDao() {
  try {
    const data = await db.Shipper.findAll({});
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback getAllShipperDao()`);
  }
}

async function createShipperDao(shipper_name) {
  try {
    const data = await db.Shipper.create({
      shipper_name: shipper_name,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback createShipperDao()`);
  }
}
async function editShipperDao(shipper_id, shipper_name) {
  try {
    const data = await db.Shipper.update(
      {
        shipper_name: shipper_name,
      },
      { where: { id: shipper_id } }
    );
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback editShipperDao()`);
  }
}

async function findShipperDao(name) {
  try {
    const data = await db.Shipper.findOne({
      shipper_name: name,
    });
    return data.id;
  } catch (error) {
    throw new Error(`${error}, traceback findShipperDao()`);
  }
}

async function deleteShipperDao(id_shipper) {
  try {
    const data = await db.Order.findOne({
      where: { shipper: id_shipper },
    });
    // console.log(data);
    if (!data) {
      const de = await db.Shipper.destroy({
        where: { id: id_shipper },
      });
      return true;
    } else if (data !== null) {
      return false;
    }
  } catch (error) {
    throw new Error(`${error}, traceback deleteShipperDao()`);
  }
}

module.exports = {
  getAllShipperDao,
  createShipperDao,
  deleteShipperDao,
  findShipperDao,
  editShipperDao,
};
