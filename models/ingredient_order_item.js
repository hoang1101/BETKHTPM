const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "IngredientOrderItem",
    {
      ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ingredient_order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: "ingredient_order_item",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.Ingredient, {
      foreignKey: "ingredient_id",
      as: "ingredient",
    });

    Model.belongsTo(models.Ingredient_Order, {
      foreignKey: "ingredient_order_id",
      as: "ingredient_order",
    });
  };
  return Model;
};
