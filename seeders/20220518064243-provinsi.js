'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Provinsis',
      [
        {
          nama_provinsi: 'Jawa Barat',
          latitude: '123',
          longitude: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Provinsis', null, {})
  },
}