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
      // date: {
      //   type: DataTypes.DATEONLY,
      // },
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
    Model.hasMany(models.IngredientOrderItem, {
      foreignKey: "ingredient_order_id",
      as: "ingredient_order_item",
    });
  };
  return Model;
};
