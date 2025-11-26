const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.ENUM("credit card", "check", "cash"),
      allowNull: false,
      defaultValue: "cash",
    },

    reservationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Reservations",
        key: "id",
      },
    },
  },
  {
    tableName: "Payments",
    timestamps: true,
  }
);

module.exports = Payment;
