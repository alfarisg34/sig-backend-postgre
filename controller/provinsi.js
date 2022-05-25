var createError = require('http-errors');
const {ProvinsiModel } = require('../models')
const { deletedOrAll } = require('../helper/util')

// read all
exports.reads = async (req, res) => {
    const provinsis = await ProvinsiModel.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        paranoid: false,
        order: [['createdAt', 'ASC']],
        // where: deletedOrAll(req.query),
    })
    res.status(200).json({
        success: true,
        message: "read all",
        data: provinsis
    })
}

// get by id
exports.read = async (req, res, next) => {
    const provinsi = await ProvinsiModel.findOne({
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
    if (!provinsi) {
        return next(createError(404, 'not found'))
    }

    res.status(200).json({
        success: true,
        message: "get by id",
        data: provinsi
    })
}

// create
exports.create = async (req, res, next) => {
    const {
        nama_provinsi,
        latitude,
        longitude,
    } = req.body
    const provinsi = await ProvinsiModel.create({
        nama_provinsi,
        latitude,
        longitude,
    })
    res.status(200).json({
        success: true,
        message: `Provinsi ${nama_provinsi} created`,
        data: provinsi,
    })
}

// update
exports.update = async (req, res, next) => {
    const provinsi = await ProvinsiModel.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        },
        paranoid: false,
        fields: ['nama_provinsi'],
        returning: ['id', 'nama_provinsi', 'updatedAt'],
    })

    // throw error 404
    if (!provinsi[0]) {
        return next(createError(404, 'provinsi not found'))
    }

    res.status(200).json({
        success: true,
        message: "Attribut updated!",
        data: provinsi[1][0],
    })
}

// delete
exports.delete = async (req, res, next) => {
    const provinsi = await ProvinsiModel.findByPk(req.params.id)
    await provinsi.destroy()
    res.status(200).json({
        success: true,
        message: "Delete success!"
    })
}

// restore
exports.restore = async (req, res, next) => {
    const { id } = req.params
    await ProvinsiModel.restore({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        message: "restore by id"
    })
}