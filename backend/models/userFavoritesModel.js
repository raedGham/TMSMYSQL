const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Favorite = sequelize.define(
  "Favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    tripID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Trips",
        key: "id",
      },
    },

    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },

    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: true,
    },
  },
  {
    tableName: "Favorites",
    timestamps: true,
  }
);

module.exports = Favorite;
