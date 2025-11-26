const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Trip = sequelize.define(
  "Trip",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    demographic: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    pricePerPerson: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    organizerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },

    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Trips",
    timestamps: true,
  }
);

module.exports = Trip;
