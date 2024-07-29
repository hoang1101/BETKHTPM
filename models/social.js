const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Social",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },

      joinChannelTelegram: {
        type: DataTypes.BOOLEAN,
      },
      joinVibxDiscord: {
        type: DataTypes.BOOLEAN,
      },
      joinTwitter: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
      freezeTableName: "social",
    }
  );

  Model.associate = (models) => {
    Model.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };
  return Model;
};
