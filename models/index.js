const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// DEFINE associations
// PRODUCT belongsTo Category
Product.belongsTo(Category,{
  foreignKey:'category_id',
  onDelete: 'CASCADE',
});

// CATEGORY have many Product
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// PRODUCT belongToMany Tag (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id',
  },
});

// TAGS belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, {
  through:{
    model: ProductTag,
    foreignKey: 'tag_id',
  },
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

