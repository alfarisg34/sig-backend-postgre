const joi = require('joi')

const validator = require('../middleware/validator')

module.exports = {
    validator,
    schemas: {
        create: joi.object().keys({
            nama_jenis: joi.string().required(),
        }),
    }
}