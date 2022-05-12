const joi = require('joi')

const validator = require('../middleware/validator')

module.exports = {
    validator,
    schemas: {
        login: joi.object().keys({
            username:joi.string().required(),
            password:joi.string().min(6).required()
        }),
    }
}