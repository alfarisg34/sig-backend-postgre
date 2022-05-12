const { QuotationModel, Sequelize: { Op } } = require('../models')
const { includeProductService } = require('./dbAssociations')

/**
 * fungsi untuk membuat string 0 di depan
 * @param {integer} num - angka yang mau diberi 0 di depan
 * @param {integer} size - panjang yang diinginkan
 * @returns {string} angka yang berbentuk string yang sudah diberi 0 di depan
 */
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

/**
 * fungsi untuk membuat string random
 * @param {*} len - panjang string yang mau dibuat
 * @returns {string} sebuah string random
 */
exports.generateRandStr = function (len = 5) {
    return [...Array(len)]
        .map((_i) => (~~(Math.random() * 36)).toString(36))
        .join('')
}

/**
 * fungsi untuk membuat project code berdasarkan project code terakhir
 * @param {integer} qty - jumlah project code yang dibutuhkan
 * @returns {integer[]} array yang berisi project code
 */
exports.generateProjectCode = async function (quotationId) {
    const { productService: { LOB: { code: lobCode } } } = await QuotationModel.findOne({
        attributes: ['productServiceId'],
        where: {
            id: quotationId
        },
        include: [includeProductService]
    })
    if (lobCode.length !== 3) {
        throw new Error('lob code failed')
    }
    const { projectCode: last } = await QuotationModel.findOne({
        attributes: ['projectCode'],
        where: {
            projectCode: {
                [Op.not]: null,
            }
        },
        order: [
            ['projectCode', 'DESC']
        ]
    }) || {
        projectCode: null,
    }
    const curretDate = new Date()
    const currentYear = (curretDate.getFullYear()).toString().substring(2, 4)
    const currentMonth = pad(curretDate.getMonth() + 1, 2)
    let projectCode = false
    if (last == null) {
        projectCode = `${currentYear}-${currentMonth}-${lobCode}-0001`
    } else {
        const year = last.split("-")[0]
        const month = last.split("-")[1]
        const identifier = last.split("-")[3]
        if (year + month == currentYear + currentMonth) {
            const increased = pad(parseInt(identifier) + 1, 4)
            projectCode = `${currentYear}-${currentMonth}-${lobCode}-${increased}`
        } else if (year != currentYear || (year == currentYear && month != currentMonth)) {
            projectCode = `${currentYear}-${currentMonth}-${lobCode}-0001`
        }
    }
    const check = await QuotationModel.count({
        where: {
            projectCode
        }
    })
    if (check) throw new Error('failed')
    return projectCode
}

/**
 * fungsi untuk membuat nomor quotation berdasarkan nomor quotation terakhir
 * @param {integer} qty - jumlah nomor quotation yang dibutuhkan
 * @returns {integer} sebuah string nomor quotation
 */
exports.generateNoQuotation = async function (qty = 1) {
    const { number: last } = await QuotationModel.findOne({
        attributes: ['number'],
        where: {
            number: {
                [Op.not]: null,
            }
        },
        order: [
            ['number', 'DESC']
        ]
    }) || {
        number: null,
    }
    let number = false
    const curretDate = new Date()
    const currentYear = (curretDate.getFullYear()).toString()
    const currentMonth = curretDate.getMonth() + 1

    //integer_to_roman
    const key = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]
    const roman = key[curretDate.getMonth()]

    if (last != null) {
        const split = last.split("/");
        const year = split[1]
        const month = split[2]
        const identifier = split[3]
        if (year + month == currentYear + roman) {
            const increased = pad(parseInt(identifier) + 1, 3)
            number = 'CRM-CC/' + currentYear + "/" + roman + "/" + increased
        } else if (year != currentYear || (year == currentYear && month != currentMonth)) {
            number = 'CRM-CC/' + currentYear + "/" + roman + "/" + '001'
        }
    } else {
        number = 'CRM-CC/' + currentYear + "/" + roman + "/" + '001'
    }
    const check = await QuotationModel.count({
        where: {
            number
        }
    })
    if (check) throw new Error('failed')
    console.log(number)
    return number
}

/**
 * fungsi untuk mengecek valid url
 * @param {string} string - string yang akan dicek
 * @returns {boolean} true jika string tersebut valid http
 */
exports.isValidHttpUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

/**
 * fungsi untuk mengecek string true
 * @param {string} string - string true
 * @returns {boolean} true jika string true
 */
const isStringTrue = (string) => {
    return string == 'true'
}

exports.isStringTrue = isStringTrue

/**
 * 
 * @param {*} param0 
 * @returns 
 */
exports.deletedOrAll = ({ all, deleted }) => {
    return (isStringTrue(deleted) ? {
        deletedAt: {
            [Op.not]: null,
        }
    } : (isStringTrue(all) ? {} : {
        deletedAt: {
            [Op.is]: null,
        }
    }))
}

exports.quotationCsvFieldFormatter = () => {
    const monthMapper = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]
    const dateFormat = (dateString) => {
        const date = new Date(dateString)
        return `${date.getDate()} ${monthMapper[date.getMonth()]} ${date.getFullYear()}`
    }
    return [
        {
            label: 'ID',
            value: 'id',
        },
        {
            label: 'Quotation number',
            value: 'number',
        },
        {
            label: 'Project code number',
            value: (row) => row['projectCode'] || 'belum ada',
            default: 'belum ada'
        },
        {
            label: 'Name',
            value: 'name',
        },
        {
            label: 'Client name',
            value: 'client.name',
        },
        // {
        //     label: 'Client id',
        //     value: 'client.id',
        // },
        {
            label: 'PIC Client',
            value: 'picClient',
        },
        // {
        //     label: 'Leader/PIC ID',
        //     value: 'picInternal.id',
        // },
        {
            label: 'Leader/PIC name',
            value: 'picInternal.name',
        },
        {
            label: 'Start date',
            value: (row) => dateFormat(row['start']),
        },
        {
            label: 'End date',
            value: (row) => dateFormat(row['end']),
        },
        // {
        //     label: 'Brand ID',
        //     value: 'groupProduct.brand.id',
        // },
        {
            label: 'Brand name',
            value: 'groupProduct.brand.name',
        },
        // {
        //     label: 'Group product ID',
        //     value: 'groupProduct.id',
        // },
        {
            label: 'Group product name',
            value: 'groupProduct.name',
        },
        {
            label: 'Value',
            value: 'value',
        },
        {
            label: 'KPI',
            value: 'kpi',
        },
        {
            label: 'Product service name',
            value: 'productService.name',
        },
        {
            label: 'LOB',
            value: 'productService.LOB.name',
        },
        {
            label: 'Budget type',
            value: 'budgetType.name',
        },
        {
            label: 'Price per unit',
            value: 'pricePerUnit',
        },
        {
            label: 'Gross margin',
            value: 'grossMargin',
        },
        {
            label: 'Penalty',
            value: 'penalty',
        },
        {
            label: 'Status',
            value: 'status',
        },
        {
            label: 'Link document',
            value: 'document',
        },
        {
            label: 'Notes',
            value: 'note',
        },
        {
            label: 'Link PRPO',
            value: 'prpo',
        },

    ]
}