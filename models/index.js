const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// DEFINE associations
Product.belongsTo(Category, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
});

// EXPORT models
module.exports = { Category, Product, Tag, ProductTag };
