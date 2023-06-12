const db = require("../models");
const cloudinary = require("cloudinary");

async function getAllProduct() {
  try {
    const response = await db.Product.findAll({});

    return response;
  } catch (error) {
    throw new Error(`${error}, traceback getAllProduct()`);
  }
}

async function createProduct(name, price, image, descript) {
  try {
    const data = await cloudinary.v2.uploader.upload(
      image,
      {
        folder: "product",
        width: 320,
        height: 320,
        crop: "scale",
      },
      function (error, result) {}
    );
    const product = await db.Product.create({
      name,
      image: data.secure_url,
      price,
      descript,
    });
    return product;
  } catch (error) {
    throw new Error(`${error}, traceback createProduct()`);
  }
}

async function editProduct(id, name, price, image, descript) {
  try {
    if (image) {
      const data = await cloudinary.v2.uploader.upload(
        image,
        function (error, result) {}
      );
      const product = await db.Product.update(
        {
          name,
          price,
          image: data.url,
          descript,
        },
        {
          where: id,
        }
      );
      return product;
    } else {
      let product = await db.Product.update(
        {
          name,
          price,
          image,
          descript,
        },
        {
          where: id,
        }
      );
      return product;
    }
  } catch (error) {
    throw new Error(`${error}, traceback editProduct()`);
  }
}

module.exports = {
  getAllProduct,
  createProduct,
  editProduct,
};
