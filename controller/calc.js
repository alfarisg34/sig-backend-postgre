const {KebudayaanModel,ProvinsiModel } = require('../models')
const { sequelize } = require('../models')
const math = require('mathjs');

module.exports.getCalculation = async function (req, res) {
  try {
    const dataBudaya = await KebudayaanModel.findAll();
    const dataProvinsi = await ProvinsiModel.findAll();
    const totalIndividual = await KebudayaanModel.findAll({
      attributes: [[sequelize.fn('count', '*'), 'totalBudaya']],
      include: [
        {
          model: ProvinsiModel
        }
      ],
      group: ['ProvinsiModel.id']
    });

    let arrTotal = [];
    totalIndividual.forEach(item => {
      arrTotal.push(parseInt(item.dataValues.totalBudaya) + 1);
    });

    const stdev = math.std(arrTotal);

    const totalBudaya = dataBudaya.length + 33;
    const totalProvinsi = dataProvinsi.length;
    const average = totalBudaya / totalProvinsi;

    const n = req.params.multiplier;
    const low = average - (n * stdev);
    const high = average + (n * stdev);

    const dataCalculate = {
      total: totalBudaya,
      totalProvinsi,
      average,
      stdev,
      low,
      high
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}