const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Recipe",
    {
      product_id: {
        type: DataTypes.INTEGER,
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
      freezeTableName: "recipe",
    }
  );

  Model.associate = (models) => {
    Model.belongsTo(models.Ingredient, {
      foreignKey: "ingredient_id",
      as: "ingredient",
    });
    Model.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };
  return Model;
};
