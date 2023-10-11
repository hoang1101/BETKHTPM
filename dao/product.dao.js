const { Op } = require("sequelize");
const db = require("../models");
const cloudinary = require("cloudinary");

async function getAllProductdao() {
  try {
    const response = await db.Product.findAll({
      // where: { activate: 1 },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      // include: [
      //   // {
      //   //   model: db.Recipe,
      //   //   as: "repice",
      //   //   include: [
      //   //     {
      //   //       model: db.Ingredient,
      //   //       as: "ingredient",
      //   //       where: {
      //   //         quantity: { [Op.gt]: 0 },
      //   //       },
      //   //     },
      //   //   ],
      //   // },
      //   {
      //     model: db.Promotion,
      //     as: "promotion",
      //     attributes: ["percent"],
      //   },
      //   // {
      //   //   model: db.Recipe,
      //   //   as: "repice",
      //   //   include: [
      //   //     {
      //   //       model: db.Ingredient,
      //   //       as: "ingredient",
      //   //       where: {
      //   //         quantity: { [Op.gt]: 0 },
      //   //       },
      //   //     },
      //   //   ],
      //   // },
      // ],
      raw: true,
    });

    return response;
  } catch (error) {
    throw new Error(`${error}, traceback getAllProduct()`);
  }
}

async function getProductdao(id) {
  try {
    const product = await db.Product.findOne({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    throw new Error(`${error}, traceback getProductdao()`);
  }
}

async function createProductdao(name, price, image, descript, recipre) {
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
    // xu ly nhap gia trung binh cho san pham khi tao moi
    let sum = 0;
    for (let j of recipre) {
      // console.log(j.ingredient_id);
      const data1 = await db.Ingredient.findOne({
        where: { id: j.ingredient_id },
      });
      sum = sum + j.quantity * data1.capital_price;
    }

    // tao san pham
    const product = await db.Product.create({
      name,
      image: data.url,
      price: sum + sum * 0.3,
      descript,
      capital_price: sum,
    });
    // tao cong thuc cho san pham
    for (let i of recipre) {
      const data = await db.Recipe.create({
        product_id: product.id,
        ingredient_id: i.ingredient_id,
        quantity: i.quantity,
      });
    }
    return product;
  } catch (error) {
    throw new Error(`${error}, traceback createProduct()`);
  }
}

async function editProductdao(id, name, price, image, descript, recipre) {
  try {
    if (image) {
      const data = await cloudinary.v2.uploader.upload(
        image,
        function (error, result) {}
      );
      let product = await db.Product.update(
        {
          name: name,
          price: price,
          image: data.url,
          descript: descript,
        },
        {
          where: { id: id },
        }
      );

      return product;
    } else {
      let product = await db.Product.update(
        {
          name: name,
          price: price,
          // image: data.url,
          descript: descript,
        },
        {
          where: { id: id },
        }
      );

      return product;
    }
  } catch (error) {
    throw new Error(`${error}, traceback editProduct()`);
  }
}

async function deleteProductdao(id) {
  try {
    let product = await db.Product.destroy({
      where: { id },
    });
    const data = await db.Recipe.destroy({
      where: { product_id: id },
    });
    return true;
  } catch (error) {
    throw new Error(`${error}, traceback deleteProduct()`);
  }
}

async function searchProductDao(condition, page, limit) {
  try {
    const { rows, count } = await db.Product.findAndCountAll({
      where: condition,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      raw: true,
      include: [
        {
          model: db.Promotion,
          as: "promotion",
          attributes: ["percent"],
        },

        // {
        //   model: db.Recipe,
        //   as: "repice",
        //   attributes: [],
        //   include: [
        //     {
        //       model: db.Ingredient,
        //       as: "ingredient",
        //       attributes: [],
        //       // where: {
        //       //   quantity: { [Op.gt]: 0 },
        //       // },
        //     },
        //   ],
        // },
      ],
      // subQuery: false,
      // raw: true,
      offset: page * limit,
      limit: limit,
    });

    return { rows, count };
  } catch (error) {
    throw new Error(
      `Error: ${error}, traceback at searchProductDao function at product.dao.js file`
    );
  }
}

//

module.exports = {
  getAllProductdao,
  createProductdao,
  editProductdao,
  deleteProductdao,
  getProductdao,
  searchProductDao,
};
