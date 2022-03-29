'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kebudayaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    modelName: 'Kebudayaan',
  });
  return Kebudayaan;
};