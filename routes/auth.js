var { Router } = require('express');
var router = Router();

const handler = require('../helper/handler')
const controller = require('../controller/auth')
const { validator, schemas } = require('../validation/auth')
const auth = require('../middleware/auth')

router.post('/login', validator(schemas.login), handler.Catcher(controller.login));
router.get('/check', auth(["LEADER", "SUPER", "FA", "ADMIN"]), handler.Catcher(controller.check));

module.exports = router;
