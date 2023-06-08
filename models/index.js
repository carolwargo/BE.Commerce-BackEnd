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
  as:'product_tags',
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  as:'product_tags',
  foreignKey: 'tag_id',
  onDelete: 'CASCADE'
});

// EXPORT models
module.exports = { Category, Product, Tag, ProductTag };
