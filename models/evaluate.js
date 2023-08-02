const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Evaluate",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_orderitem: {
        type: DataTypes.INTEGER,
      },
      customer_id: {
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      start: {
        type: DataTypes.FLOAT,
      },
      img: {
        type: DataTypes.STRING,
      },
      comment: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: "evaluate",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    Model.belongsTo(models.Order_Item, {
      foreignKey: "id_orderitem",
      as: "order_item",
    });
    Model.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
  };
  return Model;
};
