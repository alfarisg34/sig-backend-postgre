'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provinsi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['Kebudayaan'], {
        foreignKey: 'id_provinsi',
        as: 'id provinsi'
      })
    }
  }
  Provinsi.init({
    nama_provinsi: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Provinsi',
  });
  return Provinsi;
};