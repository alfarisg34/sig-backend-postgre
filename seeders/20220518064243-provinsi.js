'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Provinsis',
      [
        {nama_provinsi:"Provinsi Aceh",latitude: 4.695135,longitude: 96.7493993, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Bali",latitude:-8.4095178, longitude:115.188916, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Banten",latitude:-6.4058172, longitude:106.0640179, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Bengkulu",latitude:-3.5778471, longitude:102.3463875, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi DI Yogyakarta",latitude:-7.8753849, longitude:110.4262088, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi DKI Jakarta",latitude:-6.211544, longitude:106.845172, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Gorontalo",latitude:0.6999372, longitude:122.4467238, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Jambi",latitude:-1.4851831, longitude:102.4380581, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Jawa Barat",latitude:-7.090911, longitude:107.668887, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Jawa Tengah",latitude:-7.150975, longitude:110.1402594, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Jawa Timur",latitude:-7.5360639, longitude:112.2384017, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Kalimantan Barat",latitude:-0.2787808, longitude:111.4752851, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Kalimantan Selatan",latitude:-3.0926415, longitude:115.2837585, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Kalimantan Tengah",latitude:-1.6814878, longitude:113.3823545, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Kalimantan Timur",latitude:1.6406296, longitude:116.419389, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Kalimantan Utara",latitude:3.0731, longitude:116.0414, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Kepulauan Bangka Belitung",latitude:-2.7410513, longitude:106.4405872, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Kepulauan Riau",latitude:3.9456514, longitude:108.1428669, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Lampung",latitude:-4.5585849, longitude:105.4068079, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Maluku",latitude:-3.2384616, longitude:130.1452734, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Maluku Utara",latitude:1.5709993, longitude:127.8087693, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Nusa Tenggara Barat",latitude:-8.6529334, longitude:117.3616476, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Nusa Tenggara Timur",latitude:-8.6573819, longitude:121.0793705, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Papua",latitude:-4.269928, longitude:138.0803529, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Papua Barat",latitude:-1.3361154, longitude:133.1747162, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Riau",latitude:0.2933469, longitude:101.7068294, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sulawesi Barat",latitude:-2.8441371, longitude:119.2320784, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sulawesi Selatan",latitude:-3.6687994, longitude:119.9740534, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sulawesi Tengah",latitude:-1.4300254, longitude:121.4456179, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sulawesi Tenggara",latitude:-4.14491, longitude:122.174605, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sulawesi Utara",latitude:0.6246932, longitude:123.9750018, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sumatera Barat",latitude:-0.7399397, longitude:100.8000051, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sumatera Selatan",latitude:-3.3194374, longitude:103.914399, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Provinsi Sumatera Utara",latitude:2.1153547, longitude:99.5450974, createdAt: new Date(), updatedAt: new Date()},
        {nama_provinsi:"Warisan Bersama",latitude:-4.638583, longitude:113.208624, createdAt: new Date(), updatedAt: new Date()},
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Provinsis', null, {})
  },
}