'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kebudayaans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_budaya: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      penetapanNum: {
        type: Sequelize.INTEGER
      },
      pencatatanNum: {
        type: Sequelize.INTEGER
      },
      tahun: {
        type: Sequelize.INTEGER
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      video: {
        type: Sequelize.STRING
      },
      ProvinsiModelId: {
        type: Sequelize.INTEGER
      },
      JenisKebudayaanModelId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      initialAutoIncrement: 1000,
    }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kebudayaans');
  }
};