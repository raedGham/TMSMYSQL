const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Complaint = sequelize.define(
  "Complaint",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },

    supervisorID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },

    category: {
      type: DataTypes.ENUM(
        "Transportation",
        "Management",
        "Lost Belongings",
        "Other"
      ),
      allowNull: false,
      defaultValue: "Other",
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    complaintText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    dateFiled: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    dateReviewed: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    responseText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Complaints",
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = Complaint;
