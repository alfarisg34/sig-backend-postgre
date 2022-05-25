'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Kebudayaans',
      [
        {
          nama_budaya: 'Batik',
          image: 'https://awsimages.detik.net.id/community/media/visual/2022/03/28/salah-satu-motif-batik-jabar-motif-mega-mendung_43.jpeg?w=1200',
          penetapanNum: '123',
          pencatatanNum: '123',
          tahun: '2018',
          deskripsi: 'Batik adalah kain',
          video: 'https://www.youtube.com',
          id_provinsi: '1',
          id_jenisBudaya: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Kebudayaans', null, {})
  },
}