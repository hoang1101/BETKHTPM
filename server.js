const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Thiết lập các thông tin cấu hình của Cloudinary
cloudinary.config({
  cloud_name: "dvys3iezz",
  api_key: "327951397722326",
  api_secret: "bWf9nOsdaT2CGw4Bzci3NtXRs7Q",
});
const initRouter = require("./routers");
initRouter(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
