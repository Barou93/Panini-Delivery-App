'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOption extends Model {

    static associate(models) {
      models.Product.belongsToMany(models.Option, {
        through: models.ProductOption,
        foreignKey: 'productId',
        otherKey: 'optionId'

      });

      models.Option.belongsToMany(models.Product, {
        through: models.ProductOption,
        foreignKey: 'optionId',
        otherKey: 'productId'
      });

      models.ProductOption.belongsTo(models.Product, {
        foreignKey: 'productId',
        targetKey: 'id'
      });
      models.ProductOption.belongsTo(models.Option, {
        foreignKey: 'optionId',
        targetKey: 'id'
      })
    }
  }
  ProductOption.init({
    optionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Option',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProductOption',
  });
  return ProductOption;
};