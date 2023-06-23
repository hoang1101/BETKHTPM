const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Shipper",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shipper_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: "shipper",
    }
  );

  Model.associate = function (models) {
    Model.hasMany(models.Order, {
      foreignKey: "shipper",
      as: "order",
    });
  };
  return Model;
};
