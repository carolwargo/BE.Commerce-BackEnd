const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// INITIALIZE
class ProductTag extends Model {}

//RULES for ProductTag model
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //REFERENCE Product
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },

    //REFERENCE Tag
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
