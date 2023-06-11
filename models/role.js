const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: "role",
    }
  );

  Model.associate = function (models) {
    Model.hasMany(models.Staff, {
      foreignKey: "roleId",
      as: "staff",
    });
  };
  return Model;
};
