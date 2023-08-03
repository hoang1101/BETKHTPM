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
        allowNull: false,
        isEmail: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.BOOLEAN,
      },
      birthday: {
        type: DataTypes.DATEONLY,
      },
      isAcctive: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      freezeTableName: "customer",
    }
  );

  Model.associate = (models) => {
    Model.hasMany(models.Orders, {
      foreignKey: "customer_id",
      as: "orders",
    });
    Model.hasMany(models.Evaluate, {
      foreignKey: "customer_id",
      as: "evaluate",
    });
  };
  return Model;
};
