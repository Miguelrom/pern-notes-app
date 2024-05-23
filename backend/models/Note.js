import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Note = sequelize.define('note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
});
