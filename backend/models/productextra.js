'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productExtra extends Model {

    static associate(models) {
      // define association here
      //models.ProductExtra.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });

    }
  }
  productExtra.init({
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'productExtra',
  });
  return productExtra;
};