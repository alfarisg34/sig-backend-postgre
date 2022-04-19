const joi = require('joi')

const validator = require('../middleware/validator')

module.exports = {
    validator,
    schemas: {
        create: joi.object().keys({
            nama_provinsi: joi.string().required(),
            latitude: joi.string().required(),
            longitude: joi.string().required(),
        }),
    }
}