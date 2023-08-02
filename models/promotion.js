const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Promotion",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      staff_id: {
        type: DataTypes.INTEGER,
      },
      percent: {
        type: DataTypes.INTEGER,
      },
      start_day: {
        type: DataTypes.DATE,
      },
      end_day: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: "promotion",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    Model.belongsTo(models.Staff, {
      foreignKey: "staff_id",
      as: "staff",
    });
  };
  return Model;
};
