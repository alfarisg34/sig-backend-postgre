var createError = require('http-errors');
const {AdminModel } = require('../models')
const { deletedOrAll } = require('../helper/util')

// read all
exports.read = async (req, res) => {
    const admins = await AdminModel.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        paranoid: false,
        order: [['createdAt', 'ASC']],
        where: deletedOrAll(req.query),
    })
    res.status(200).json({
        success: true,
        message: "read all",
        data: admins
    })
}

// get by id
exports.get = async (req, res, next) => {
    const admin = await AdminModel.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            id: req.params.id
        },
        raw: true,
        paranoid: false
    })

    // throw error 404
    if (!admin) {
        return next(createError(404, 'not found'))
    }

    res.status(200).json({
        success: true,
        message: "get by id",
        data: admin
    })
}

// create
exports.create = async (req, res, next) => {
    const {
        username,
        password
    } = req.body
    const admin = await AdminModel.create({
        username,
        password
    })
    res.status(200).json({
        success: true,
        message: `Admin ${username} created`,
        data: admin,
    })
}

// update
exports.update = async (req, res, next) => {
    const admin = await AdminModel.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        },
        paranoid: false,
        fields: ['username'],
        returning: ['id', 'username', 'updatedAt'],
    })

    // throw error 404
    if (!admin[0]) {
        return next(createError(404, 'admin not found'))
    }

    res.status(200).json({
        success: true,
        message: "Attribut updated!",
        data: admin[1][0],
    })
}

// delete
exports.delete = async (req, res, next) => {
    const admin = await AdminModel.findByPk(req.params.id)
    await admin.destroy()
    res.status(200).json({
        success: true,
        message: "Delete success!"
    })
}

// restore
exports.restore = async (req, res, next) => {
    const { id } = req.params
    await AdminModel.restore({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        message: "restore by id"
    })
}