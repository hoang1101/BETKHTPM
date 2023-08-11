const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Ingredient",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      measure_id: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0, // Giá trị mặc định lớn hơn 0
        allowNull: false, // Không cho phép null
        validate: {
          min: 0.1, // Giá trị tối thiểu là 0.1
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: "ingredient",
    }
  );

  Model.associate = (models) => {
    Model.hasMany(models.IngredientOrderItem, {
      foreignKey: "ingredient_id",
      as: "ingredient_order_item",
    });
    Model.belongsTo(models.Measure, {
      foreignKey: "measure_id",
      as: "measure",
    });
    Model.hasMany(models.Recipe, {
      foreignKey: "ingredient_id",
      as: "recipe",
    });
  };
  return Model;
};
