// const cartRouter = require('./cart');
// const orderRouter = require('./order');
// const statisticRoutter = require('./statistic');
const authRouter = require("./auth");
// const adminRouter = require('./admin');
// // const managerRouter = require("./manager");
// const userRouter = require('./user');

const initRouter = (app) => {
  //   app.use('/api/cart', cartRouter);

  //   app.use('/api/order', orderRouter);

  //   app.use('/api/statistic', statisticRoutter);

  app.use("/api/v1/auth", authRouter);
  //   app.use('/api/v1/admin', adminRouter);
  //   app.use("/api/v1/manager", managerRouter);
  //   app.use('/api/v1/user', userRouter);
};

module.exports = initRouter;
