const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        unique: true,
      },
      token: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        unique: true,
      },
      twitterUsername: {
        type: DataTypes.STRING,
      },
      telegramId: {
        type: DataTypes.STRING,
      },
      twitterId: {
        type: DataTypes.STRING,
      },
      discordId: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: "user",
    }
  );

  Model.associate = (models) => {
    Model.hasMany(models.Social, {
      foreignKey: "user_id",
      as: "social",
    });
  };
  return Model;
};
