const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Measure",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: "measure",
    }
  );

  Model.associate = (models) => {
    Model.hasOne(models.Ingredient, {
      foreignKey: "measure_id",
      as: "ingredient",
    });
  };
  return Model;
};
