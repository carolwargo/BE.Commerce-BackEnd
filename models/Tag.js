// IMPORT parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// IMPORT database connection from config.js
const sequelize = require("../config/connection");

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Tag",
  }
);

module.exports = Tag;
