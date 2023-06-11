const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Order_Item",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      freezeTableName: "order_item",
    }
  );

  Model.associate = (models) => {
    Model.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    Model.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
  };
  return Model;
};
