const bcrypt = require('bcryptjs')

/**
 * fungsi untuk membandingkan password dengan yang sudah di hash
 * @param {string} password - raw password
 * @param {string} hashed - hashed password
 * @returns {boolean} true jika benar, selain itu false
 */
exports.comparePassword = async function (password, hashed) {
  return bcrypt.compare(password, hashed)
}

/**
 * fungsi untuk hash password
 * @param {string} password - raw password 
 * @param {integer} [length] - panjang salt
 * @returns {string} hashed password
 */
exports.hashPassword = async function (password, length = 10) {
  return bcrypt.hash(password, length)
}