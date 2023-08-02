// const cartRouter = require('./cart');
// const orderRouter = require('./order');
// const statisticRoutter = require('./statistic');
const authRouter = require("./auth");
const customerRouter = require("./customer");
// const adminRouter = require('./admin');
const untilRoter = require("./until");
const productRouter = require("./product");
const staffRouter = require("./staff");
// const userRouter = require('./user');

const initRouter = (app) => {
  //   app.use('/api/cart', cartRouter);

  //   app.use('/api/order', orderRouter);

  //   app.use('/api/statistic', statisticRoutter);

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/staff", staffRouter);
  app.use("/api/v1/until", untilRoter);
  app.use("/api/v1/customer", customerRouter);
};

module.exports = initRouter;
