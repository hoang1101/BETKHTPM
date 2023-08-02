const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Ingredient",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      measure_id: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
      freezeTableName: "ingredient",
    }
  );

  Model.associate = (models) => {
    Model.hasMany(models.IngredientOrderItem, {
      foreignKey: "ingredient_id",
      as: "ingredient_order_item",
    });
    Model.belongsTo(models.Measure, {
      foreignKey: "measure_id",
      as: "measure",
    });
    Model.hasMany(models.Recipe, {
      foreignKey: "ingredient_id",
      as: "recipe",
    });
  };
  return Model;
};
