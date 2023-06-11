const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Ingredient_Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      staff_id: {
        type: DataTypes.INTEGER,
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: "ingredient_order",
    }
  );

  Model.associate = (models) => {
    Model.belongsTo(models.Staff, {
      foreignKey: "staff_id",
      as: "staff",
    });
    Model.belongsTo(models.Ingredient, {
      foreignKey: "id",
      as: "ingredient",
    });
  };
  return Model;
};
