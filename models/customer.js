const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      fullname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [10, 10],
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.BOOLEAN,
      },
      birthday: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: "customer",
    }
  );

  Model.associate = (models) => {
    Model.hasMany(models.Order, {
      foreignKey: "customer_id",
      as: "order",
    });
  };
  return Model;
};
