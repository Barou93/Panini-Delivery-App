'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {

    static associate(models) {

      models.Product.belongsToMany(models.Option, {
        through: models.OrderItem,
        foreignKey: 'productId',
        otherKey: 'optionId'
      });

      models.Option.belongsToMany(models.Product, {
        through: models.OrderItem,
        foreignKey: 'optionId',
        otherKey: 'productId'
      });

      models.OrderItem.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });
      models.OrderItem.belongsTo(models.Option, { foreignKey: 'optionId', targetKey: 'id' });
      models.OrderItem.belongsTo(models.Cart);

    }
  }
  OrderItem.init({

    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    cartId: DataTypes.INTEGER,

    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    optionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Option',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};