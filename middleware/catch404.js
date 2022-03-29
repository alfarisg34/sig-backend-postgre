const createError = require('http-errors')

module.exports = function (req, _res, next) {
    next(createError(404, `${req.path} doesn't exist`, {
        "path": req.path,
        "method": req.method,
    }));
}