'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('../service/bcrypt');
const constant = require('../constant')

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (admin, options) => {
        const encryptedPassword = await bcrypt.hashPassword(admin.password);
        admin.password = encryptedPassword;
      },
      // beforeValidate: (user, options) => {
      //   user.email = user.email.toLowerCase();
      // }
    },
    sequelize,
    // paranoid: true,
    modelName: constant.model.ADMIN,
    tableName: constant.dbTableName.ADMIN,
  });
  return Admin;
};