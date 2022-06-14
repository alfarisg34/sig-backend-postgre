'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Admins',
      [
        {
          username: 'superadmin1',
          password: '$2a$10$l96Rvq9ciY7UCuF/PqB9Lu1s5snudAqBxU/E1Luocp9PlBsCUUm82',//adminadmin
          email: 'superadmin1@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Admins', null, {})
  },
}