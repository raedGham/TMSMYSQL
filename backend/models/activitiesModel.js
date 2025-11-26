const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Activity = sequelize.define(
  "Activity",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    finishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    costPerPerson: {
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
    tableName: "Activities",
    timestamps: true,
  }
);

module.exports = Activity;
