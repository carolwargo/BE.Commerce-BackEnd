const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// DEFINE associations

//CATEGORY has many Product models
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

//PRODUCT belongs to many Tag models
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  foreignKey: 'product_id',
  },
});

//TAG belongs to many Product models
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
});

//ALL PRODUCT have multiple TAG
Product.hasMany(Tag, {
  foreignKey: 'product_id',
});

Tag. hasMany(Product, {
  through: {
    model: ProductTag,
   foreignKey: 'tag_id',
  },
});

// EXPORT models
module.exports = { Category, Product, Tag, ProductTag };
