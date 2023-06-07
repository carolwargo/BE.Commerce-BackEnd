const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "your_database",
  "your_username",
  "your_password",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const Category = Category(sequelize, Sequelize);
const Product = Product(sequelize, Sequelize);
const Tag = Tag(sequelize, Sequelize);
const ProductTag = ProductTag(sequelize, Sequelize);

// DEFINE associations
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "product_tags",
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "product_tags",
  foreignKey: "tag_id",
  onDelete: "CASCADE",
});

ProductTag.belongsTo(Product, {
  foreignKey: "product_id",
});

ProductTag.belongsTo(Tag, {
  foreignKey: "tag_id",
});

// EXPORT models
module.exports = {
  Category,
  Product,
  Tag,
  ProductTag,
};
