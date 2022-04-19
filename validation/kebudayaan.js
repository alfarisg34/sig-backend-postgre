const joi = require('joi')

const validator = require('../middleware/validator')

module.exports = {
    validator,
    schemas: {
        create: joi.object().keys({
            nama_budaya: joi.string().required(),
            image: joi.string(),
            penetapanNum: joi.number().integer(),
            pencatatanNum: joi.number().integer(),
            tahun: joi.number().integer(),
            deskripsi: joi.string(),
            video: joi.string(),
            id_provinsi: joi.number().integer().required(),
            id_jenisBudaya: joi.number().integer().required(),
        }),
    }
}