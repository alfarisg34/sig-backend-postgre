const createError = require('http-errors')
/**
 * Fungsi untuk try catch pada controller
 * @param {function} fn controller function
 */
exports.Catcher = (fn) =>
    function catcher(...args) {
        const next = args[args.length - 1]
        return Promise.resolve(fn(...args)).catch(error => {
            next(createError(error))
        })
    }