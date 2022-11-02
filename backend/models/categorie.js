'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {

    static associate(models) {
      // define association here
      models.Categorie.hasMany(models.Product, { foreignKey: 'categorieId', targetkey: 'id' })

    }
  }
  Categorie.init({
    name: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorie',
  });
  return Categorie;
};