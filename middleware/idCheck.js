const createError = require('http-errors')

module.exports = function (req, res, next) {
    const id = parseInt(req.params.id)
    if (typeof id != 'number' || id != req.params.id) {
        return next(createError(400, 'id not number'))
    }
    next()
}