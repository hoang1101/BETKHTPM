const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Staff",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: {
        type: DataTypes.STRING,
      },
      password: {
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
      roleId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: "staff",
    }
  );

  Model.associate = function (models) {
    Model.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });
    Model.hasMany(models.Ingredient_Order, {
      foreignKey: "staff_id",
      as: "ingredient_order",
    });
    Model.hasMany(models.Order, {
      foreignKey: "staff_id",
      as: "order",
    });
  };
  return Model;
};
