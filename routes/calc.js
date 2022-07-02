var { Router } = require('express');
var router = Router();

const handler = require('../helper/handler')
const controller = require('../controller/calc')

router.get('/', handler.Catcher(controller.getCalculation));

module.exports = router;
