'use strict';
const {
  Model
} = require('sequelize');

const constant = require('../constant')

module.exports = (sequelize, DataTypes) => {
  class JenisKebudayaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models[constant.model.KEBUDAYAAN], {
        foreignKey: 'id',
        as: 'id jenis budaya'
      })
    }
  }
  JenisKebudayaan.init({
    nama_jenis: DataTypes.STRING
  }, {
    sequelize,
    modelName: constant.model.JENISKEBUDAYAAN,
    tableName: constant.dbTableName.JENISKEBUDAYAAN,
  });
  return JenisKebudayaan;
};