const { Sequelize } = require('../models')

module.exports = function (err, req, res, next) {
  switch (err.constructor) {
    case Sequelize.UniqueConstraintError:
      res.locals.message = err.errors.map(val => val.message);
      res.locals.statusCode = 400
      break;
    case Sequelize.ForeignKeyConstraintError:
      res.locals.message = err.message;
      res.locals.statusCode = 400
      break;
    default:
      res.locals.message = err.message;
      break;
  }
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status((res.locals.statusCode || err.status) || 500).json({
    success: false,
    message: res.locals.message,
    error: res.locals.error,
  })
}