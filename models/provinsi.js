'use strict';
const {
  Model
} = require('sequelize');

const constant = require('../constant')

module.exports = (sequelize, DataTypes) => {
  class Provinsi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models[constant.model.KEBUDAYAAN], {
        foreignKey: 'id',
        // as: 'id provinsi'
      })
    }
  }
  Provinsi.init({
    nama_provinsi: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    paranoid:false,
    modelName: constant.model.PROVINSI,
    tableName: constant.dbTableName.PROVINSI,
  });
  return Provinsi;
};