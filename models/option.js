'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {

    static associate(models) {
      models.Option.hasMany(models.OrderItem, { foreignKey: 'optionId', targetKey: 'id' });


    }
  }
  Option.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Option',
  });
  return Option;
};