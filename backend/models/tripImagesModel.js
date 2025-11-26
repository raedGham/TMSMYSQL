const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TripImage = sequelize.define(
  "TripImage",
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

    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    originalName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mimeType: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "TripImages",
    timestamps: true,
  }
);

module.exports = TripImage;

