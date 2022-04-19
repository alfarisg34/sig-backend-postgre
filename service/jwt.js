const jwt = require('jsonwebtoken')
const util = require('../helper/util')

/**
 * fungsi untuk decode token jwt
 * @param {string} token - token jwt setelah dihilangkan bearernya
 * @returns {string} identifier yang disimpan sebelumnya
 */
exports.decodeJWT = async function decodeJWT(token = '') {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET)
  if (decoded.i.slice(0, decoded.i.length - 5) !== process.env.JWT_IDENTIFIER)
    return null
  else return decoded.u
}

/**
 * fungsi untuk membuat token jwt
 * @param {string} id - identifier yang mau disimpan, seperti username
 * @returns {string} sebuah token jwt
 */
exports.generateJWT = async function generateJWT(id) {
  const rand = util.generateRandStr(5)
  return jwt.sign(
    { u: id, i: `${process.env.JWT_IDENTIFIER}${rand}` },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  )
}
