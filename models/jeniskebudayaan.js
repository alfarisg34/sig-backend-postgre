'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JenisKebudayaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['Kebudayaan'], {
        foreignKey: 'id_jenisBudaya',
        as: 'id jenis budaya'
      })
    }
  }
  JenisKebudayaan.init({
    nama_jenis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JenisKebudayaan',
  });
  return JenisKebudayaan;
};