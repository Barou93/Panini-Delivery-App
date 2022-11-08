'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productExtra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //models.ProductExtra.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' })
    }
  }
  productExtra.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'productExtra',
  });
  return productExtra;
};