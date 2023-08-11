const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      descript: {
        type: DataTypes.STRING,
      },
      activate: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      freezeTableName: "product",
    }
  );

  Model.associate = (models) => {
    Model.hasMany(models.Recipe, {
      foreignKey: "product_id",
      as: "repice",
    });
    Model.hasMany(models.Order_Item, {
      foreignKey: "product_id",
      as: "order_item",
    });
    Model.hasMany(models.Promotion, {
      foreignKey: "product_id",
      as: "promotion",
    });
    Model.hasMany(models.Evaluate, {
      foreignKey: "product_id",
      as: "evaluate",
    });
  };
  return Model;
};
