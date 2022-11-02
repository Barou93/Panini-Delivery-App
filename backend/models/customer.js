'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {

    static associate(models) {
      // define association here
      models.Customer.hasMany(models.OrderDetail, { foreignKey: 'customerId', targetKey: 'id' });
    }
  }
  Customer.init({
    username: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};