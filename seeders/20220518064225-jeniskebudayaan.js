'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'JenisKebudayaans',
      [
        {
          nama_jenis: 'Seni Pertunjukan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('JenisKebudayaans', null, {})
  },
}