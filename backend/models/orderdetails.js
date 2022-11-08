'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Customer.belongsToMany(models.Product, {
        through: models.OrderDetail,
        foreignKey: 'customerId',
        otherKey: 'productId',
      });

      models.Product.belongsToMany(models.Customer, {
        through: models.OrderDetail,
        foreignKey: 'productId',
        otherKey: 'customerId',

      });

      models.OrderDetail.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        targetKey: 'id',

      });

      models.OrderDetail.belongsTo(models.Product, {
        foreignKey: 'productId',
        targetKey: 'id',

      });
    }
  }
  OrderDetail.init({
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }

    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Customer',
        key: 'id'
      }

    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};