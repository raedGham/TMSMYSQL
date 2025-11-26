const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    numberOfPeople: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    status: {
      type: DataTypes.ENUM("active", "cancelled", "confirmed", "completed"),
      allowNull: false,
      defaultValue: "active",
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
  },
  {
    tableName: "Reservations",
    timestamps: true,
  }
);

module.exports = Reservation;
