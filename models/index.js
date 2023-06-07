const Product = require('./Product');
const Category = require('./Category'); 
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


/*
// Set up the associations
Product.belongsTo(Category, { foreignKey: 'category_id' });
ProductTag.belongsTo(Product, { foreignKey: 'product_id' });
ProductTag.belongsTo(Tag, { foreignKey: 'tag_id' });

module.exports = {
  Category,
  Product,
  Tag,
  ProductTag,
};*/



Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id'});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id'});
    

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

module.exports = {
  Category,
  Product,
  Tag,
  ProductTag,
};


