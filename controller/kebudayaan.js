var createError = require('http-errors');
const {KebudayaanModel,ProvinsiModel,JenisKebudayaanModel } = require('../models')
const { deletedOrAll} = require('../helper/util')
const parseSequelizeOptions = require('../helper/parseSequelizeOptions')
const getCursorData = require('../helper/getCursorData')
const { deleteCloudPicture } = require("../service/cloudinary");

// read all
exports.reads = async (req, res) => {
    const kebudayaans = await KebudayaanModel.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include:[
          {  model: ProvinsiModel,
            attributes:['nama_provinsi']}
        ],
        paranoid: false,
        order: [['createdAt', 'ASC']],
        // where: deletedOrAll(req.query),
    })
    res.status(200).json({
        success: true,
        message: "read all",
        data: kebudayaans
    })
}

exports.getBudayaAll = async function (req, res) {
    const options = parseSequelizeOptions(req.query);
    options.include = [
        {
            model: JenisKebudayaanModel,
            attributes: ['nama_jenis'],
        },
        {
            model: ProvinsiModel,
            attributes: ['nama_provinsi']
        }
    ];
    options.order = [
        ['id', 'DESC']
    ];
    const budaya = await KebudayaanModel.findAll(options);
    const cursor = await getCursorData(KebudayaanModel, req.query);

    return res.status(200).json({
      sucess: true,
      data: budaya,
      cursor
    });
}
// get by id
exports.read = async (req, res, next) => {
    const kebudayaan = await KebudayaanModel.findOne({
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
    if (!kebudayaan) {
        return next(createError(404, 'not found'))
    }

    res.status(200).json({
        success: true,
        message: "get by id",
        data: kebudayaan
    })
}

// get by province id
exports.readsbyprovince = async (req, res, next) => {
    const provinsi = await ProvinsiModel.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt' ,'latitude','longitude']
        },
        where: {
            id: req.params.id
        },
        raw: true,
        paranoid: false,
    })
    const kebudayaan = await KebudayaanModel.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            id_provinsi: req.params.id
        },
        raw: true,
        paranoid: false,
        include: [{
            model: ProvinsiModel,
            // as:'provinsi',
            // where: {id: req.params.id}
           }]
    })

    // throw error 404
    if (!kebudayaan) {
        return next(createError(404, 'not found'))
    }

    res.status(200).json({
        success: true,
        message: "get by id",
        data: kebudayaan
    })
}

// create
exports.create = async (req, res, next) => {
    const {
        nama_budaya,
        penetapanNum,
        pencatatanNum,
        tahun,
        deskripsi,
        video,
        ProvinsiModelId,
        JenisKebudayaanModelId,
    } = req.body

    const duplicate = await KebudayaanModel.findOne({ where: { nama_budaya } })
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Budaya already exist"
      });
    };

    const kebudayaan = await KebudayaanModel.create({
        nama_budaya,
        image:req.file.path,
        penetapanNum,
        pencatatanNum,
        tahun,
        deskripsi,
        video,
        ProvinsiModelId,
        JenisKebudayaanModelId,
    })
    res.status(200).json({
        success: true,
        message: `Kebudayaan ${nama_budaya} created`,
        data: kebudayaan,
    })
}

// update
exports.update = async (req, res, next) => {
    const kebudayaan = await KebudayaanModel.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        },
        paranoid: false,
        fields: ['nama_budaya'],
        returning: ['id', 'nama_budaya', 'updatedAt'],
    })

    // throw error 404
    if (!kebudayaan[0]) {
        return next(createError(404, 'kebudayaan not found'))
    }

    res.status(200).json({
        success: true,
        message: "Attribut updated!",
        data: kebudayaan[1][0],
    })
}

// delete
exports.delete = async (req, res, next) => {
    const kebudayaan = await KebudayaanModel.findByPk(req.params.id)
    await kebudayaan.destroy()
    res.status(200).json({
        success: true,
        message: "Delete success!"
    })
}

// restore
exports.restore = async (req, res, next) => {
    const { id } = req.params
    await KebudayaanModel.restore({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        message: "restore by id"
    })
}