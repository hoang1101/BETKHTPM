const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      staff_id: {
        type: DataTypes.INTEGER,
      },
      customer_id: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: true,
      freezeTableName: "orders",
    }
  );

  Model.associate = (models) => {
    Model.hasMany(models.Order_Item, {
      foreignKey: "order_id",
      as: "order_item",
    });
    Model.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    Model.belongsTo(models.Staff, {
      foreignKey: "staff_id",
      as: "staff",
    });
  };
  return Model;
};
