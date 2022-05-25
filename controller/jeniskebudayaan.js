var createError = require('http-errors');
const {JenisKebudayaanModel } = require('../models')
const { deletedOrAll } = require('../helper/util')

// read all
exports.reads = async (req, res) => {
    const jeniskebudayaans = await JenisKebudayaanModel.findAll({
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
        data: jeniskebudayaans
    })
}

// get by id
exports.read = async (req, res, next) => {
    const jeniskebudayaan = await JenisKebudayaanModel.findOne({
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
    if (!jeniskebudayaan) {
        return next(createError(404, 'not found'))
    }

    res.status(200).json({
        success: true,
        message: "get by id",
        data: jeniskebudayaan
    })
}

// create
exports.create = async (req, res, next) => {
    const {
        nama_jenis,
    } = req.body
    const jeniskebudayaan = await JenisKebudayaanModel.create({
        nama_jenis,
    })
    res.status(200).json({
        success: true,
        message: `Jenis Kebudayaan ${nama_jenis} created`,
        data: jeniskebudayaan,
    })
}

// update
exports.update = async (req, res, next) => {
    const jeniskebudayaan = await JenisKebudayaanModel.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        },
        paranoid: false,
        fields: ['nama_jenis'],
        returning: ['id', 'nama_jenis', 'updatedAt'],
    })

    // throw error 404
    if (!jeniskebudayaan[0]) {
        return next(createError(404, 'jeniskebudayaan not found'))
    }

    res.status(200).json({
        success: true,
        message: "Attribut updated!",
        data: jeniskebudayaan[1][0],
    })
}

// delete
exports.delete = async (req, res, next) => {
    const jeniskebudayaan = await JenisKebudayaanModel.findByPk(req.params.id)
    await jeniskebudayaan.destroy()
    res.status(200).json({
        success: true,
        message: "Delete success!"
    })
}

// restore
exports.restore = async (req, res, next) => {
    const { id } = req.params
    await JenisKebudayaanModel.restore({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        message: "restore by id"
    })
}