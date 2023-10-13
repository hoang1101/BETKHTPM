const db = require("../models");
// lấy ra một đơn vị của nguyên liệu
async function getOneMeasureDao(name) {
  try {
    const kt = await db.Measure.findOne({
      where: {
        name: name,
      },
    });
    return kt;
  } catch (error) {
    throw new Error(`${error}, traceback getOneMeasureDao()`);
  }
}

// create measure
async function createMeasureDao(name) {
  try {
    const data = await db.Measure.create({
      name,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback createMeasureDao()`);
  }
}
/// update measure
async function updateMeasureDao(name, id) {
  try {
    const data = await db.Measure.update(
      {
        name,
      },
      { where: { id: id } }
    );
    return data;
  } catch (error) {
    throw new Error(`${error}, traceback updateMeasureDao()`);
  }
}
module.exports = {
  getOneMeasureDao,
  createMeasureDao,
  updateMeasureDao,
};
