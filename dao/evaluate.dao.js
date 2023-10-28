const db = require("../models");
const moment = require("moment");

// tạo đánh giá có ảnh
async function createEvaluateDao(
  id_orderitem,
  customer_id,
  product_id,
  start,
  url,
  comment
) {
  try {
    const evaluate = await db.Evaluate.create({
      id_orderitem,
      customer_id,
      product_id,
      start,
      img: url,
      comment,
      date: new Date(
        moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("YYYY-MM-DD HH:mm:ss")
      ),
    });
    return evaluate;
  } catch (error) {
    throw new Error(`${error}, traceback createEvaluateDao()`);
  }
}
/// tạo đánh gai không có ảnh
async function createEvaluateNoImgDao(
  id_orderitem,
  customer_id,
  product_id,
  start,
  comment
) {
  try {
    const evaluate = await db.Evaluate.create({
      id_orderitem,
      customer_id,
      product_id,
      start,
      comment,
      date: new Date(
        moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("YYYY-MM-DD HH:mm:ss")
      ),
    });
    return evaluate;
  } catch (error) {
    throw new Error(`${error}, traceback createEvaluateNoImgDao()`);
  }
}

// edit danh gia san pham
async function updateEvaluateDao(start, url, comment, id) {
  try {
    const evaluate = await db.Evaluate.update(
      {
        start,
        img: url,
        comment,
      },
      {
        where: { id: id },
      }
    );
    return evaluate;
  } catch (error) {
    throw new Error(`${error}, traceback updateEvaluateDao()`);
  }
}
// edit danh giá sản phẩm không hinh ảnh
async function updateEvaluateNoImgDao(start, comment, id) {
  try {
    const evaluate = await db.Evaluate.update(
      {
        start,
        comment,
      },
      {
        where: { id: id },
      }
    );
    return evaluate;
  } catch (error) {
    throw new Error(`${error}, traceback updateEvaluateNoImgDao()`);
  }
}
module.exports = {
  createEvaluateDao,
  createEvaluateNoImgDao,
  updateEvaluateDao,
  updateEvaluateNoImgDao,
};
