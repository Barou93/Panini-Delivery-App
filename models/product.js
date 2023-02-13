'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      // define association here
      models.Product.belongsTo(models.Categorie, { foreignKey: 'categorieId', targetKey: 'id' });
      models.Product.hasMany(models.OrderItem, { foreignKey: 'productId', targetKey: 'id' });

    }
  }
  Product.init({
    categorieId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    product_image: DataTypes.STRING,
    price: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};