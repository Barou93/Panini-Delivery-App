'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopOrder extends Model {

    static associate(models) {
      // define association here
      models.ShopOrder.belongsTo(models.Cart, { foreignKey: 'orderId', targetKey: 'id' });
    }
  }
  ShopOrder.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,

    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cart',
        key: 'id'
      }
    },

    username: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShopOrder',
  });
  return ShopOrder;
};