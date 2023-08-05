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
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
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
        type: DataTypes.DATEONLY,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
      isAcctive: {
        type: DataTypes.BOOLEAN,
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
    Model.hasMany(models.Orders, {
      foreignKey: "staff_id",
      as: "orders",
    });
    Model.hasMany(models.Promotion, {
      foreignKey: "staff_id",
      as: "promotion",
    });
  };
  return Model;
};
