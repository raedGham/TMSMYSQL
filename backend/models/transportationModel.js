const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transportation = sequelize.define(
  "Transportation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    type: {
      type: DataTypes.ENUM("car", "fairy", "train"),
      allowNull: false,
    },

    arrivalLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    departureLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    arrivalDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    departureDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    duration: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
    },

    costPerTrip: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    tripID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Trips",
        key: "id",
      },
    },
  },
  {
    tableName: "Transportations",
    timestamps: true,
  }
);

module.exports = Transportation;
