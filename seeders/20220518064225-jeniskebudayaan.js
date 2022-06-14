'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'JenisKebudayaans',
      [
        {nama_jenis: 'Adat Istiadat Masyarakat, Ritus, dan Perayaan-Perayaan',createdAt: new Date(),updatedAt: new Date(),},
        {nama_jenis: 'Keterampilan dan Kemahiran Kerajinan Tradisional',createdAt: new Date(),updatedAt: new Date(),},
        {nama_jenis: 'Pengetahuan dan kebiasaan perilaku mengenai alam dan semesta',createdAt: new Date(),updatedAt: new Date(),},
        {nama_jenis: 'Seni Pertunjukan',createdAt: new Date(),updatedAt: new Date(),},
        {nama_jenis: 'Tradisi dan Ekspresi Lisan',createdAt: new Date(),updatedAt: new Date(),},
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('JenisKebudayaans', null, {})
  },
}