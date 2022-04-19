const createError = require('http-errors')

const jwt = require('../service/jwt');
const { UserModel, Sequelize: { Op } } = require('../models')

/**
 * 
 * @param {string[]} [roles=[]] - role yang diizinkan
 * @returns {*} fungsi middleware
 */
module.exports = function (roles = []) {
    return async function auth(req, res, next) {
        try {
            if (!req.headers.authorization) {
                return next(createError(401, 'tidak ada izin'))
            }

            const token = String(req.headers.authorization).replace(/Bearer /, '')
            const decodedToken = await jwt.decodeJWT(token)

            if (!decodedToken) {
                return next(createError(401, 'tidak ada izin'))
            }

            const user = await UserModel.findOne({
                where: {
                    id: decodedToken,
                },
                raw: true,
                attributes: ['id', 'role']
            })

            if (!roles.includes(user.role) && user.role != 'SUPER') {
                return next(createError(401, 'role dilarang'))
            }

            res.locals.auth = user.id
            res.locals.role = user.role
            next()
        } catch (err) {
            if (err.name == 'JsonWebTokenError') {
                return next(createError(400, err))
            }
            if (err.name == 'NotBeforeError') {
                return next(createError(400, err))
            }
            if (err.name == 'TokenExpiredError') {
                return next(createError(403, err))
            }
            next(createError(err))
        }
    }
}
