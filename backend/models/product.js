'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Product.belongsTo(models.Categorie, { foreignKey: 'categorieId', targetKey: 'id' });
    }
  }
  Product.init({
    categorieId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    product_image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};