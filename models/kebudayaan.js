'use strict';
const createError = require('http-errors')
const {
  Model
} = require('sequelize');

const constant = require('../constant')

module.exports = (sequelize, DataTypes) => {
  class Kebudayaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models[constant.model.PROVINSI], {
        foreignKey: 'id',
        // as: 'provinsi'
      }),
      this.hasOne(models[constant.model.JENISKEBUDAYAAN], {
        foreignKey: 'id',
        // as: 'jenisKebudayaan'
      })
    }
  }
  Kebudayaan.init({
    nama_budaya: DataTypes.STRING,
    image: DataTypes.STRING,
    penetapanNum: DataTypes.INTEGER,
    pencatatanNum: DataTypes.INTEGER,
    tahun: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    video: DataTypes.STRING,
    id_provinsi: DataTypes.INTEGER,
    id_jenisBudaya: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: constant.model.KEBUDAYAAN,
    tableName: constant.dbTableName.KEBUDAYAAN,
  });
  return Kebudayaan;
};