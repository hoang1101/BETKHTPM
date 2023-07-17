const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Evaluate",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      start: {
        type: DataTypes.INTEGER,
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
      foreignKey: "id",
      as: "order_item",
    });
  };
  return Model;
};
