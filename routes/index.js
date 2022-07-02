var { Router } = require('express');
var router = Router();

var authRouter = require('./auth');
var adminsRouter = require('./admins');
var provinsisRouter = require('./provinsis');
var jenisKebudayaansRouter = require('./jeniskebudayaans');
var kebudayaansRouter = require('./kebudayaans');
var calcRouter = require('./calc');

const auth = require('../middleware/auth')

router.get('/', function (_req, res, _next) {
    res.status(200).json({
      message: "api base url",
    })
  });

router.get('/protected/admin', auth(["ADMIN"]), function (_req, res, _next) {
  res.status(200).json({
    message: "admin only",
  })
});

// register route
router.use('/admin', adminsRouter)
router.use('/provinsi', provinsisRouter)
router.use('/jeniskebudayaan', jenisKebudayaansRouter)
router.use('/kebudayaan', kebudayaansRouter)
router.use('/auth', authRouter)
router.use('/calc', calcRouter)

module.exports = router;