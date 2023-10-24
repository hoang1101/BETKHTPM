const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3306;
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

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
