const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Order_Item",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        // primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        // primaryKey: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: "order_item",
    }
  );

  Model.associate = (models) => {
    Model.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    Model.belongsTo(models.Orders, {
      foreignKey: "order_id",
      as: "orders",
    });
    Model.hasOne(models.Evaluate, {
      foreignKey: "id_orderitem",
      as: "evaluate",
    });
  };
  return Model;
};
