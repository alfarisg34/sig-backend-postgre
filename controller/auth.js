var createError = require('http-errors');

const { AdminModel } = require('../models')
const bcrypt = require('../service/bcrypt');
const jwt = require('../service/jwt')

//login
exports.login = async function (req, res, next) {
    const admin = await AdminModel.findOne({
        where: {
            username: req.body.username.toLowerCase()
        },
        raw: true,
    });

    if (!admin) {
        return next(createError(404, 'admin not found'))
    }

    const passwordAuth = await bcrypt.comparePassword(req.body.password, admin.password);

    if (!passwordAuth) {
        return next(createError(403, "Username and password didn't match"))
    }

    const token = await jwt.generateJWT(admin.id)

    res.status(200).json({
        success: true,
        message: "Login Success",
        data: {
            adminId: admin.id,
            username: admin.username,
            token: token,
        }
    });
}

exports.check = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'token valid',
    })
}