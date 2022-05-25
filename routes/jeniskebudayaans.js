var { Router } = require('express');
var router = Router();

const handler = require('../helper/handler')
const controller = require('../controller/jeniskebudayaan')
const { validator, schemas } = require('../validation/jeniskebudayaan')
const idCheck = require('../middleware/idCheck')
const auth = require('../middleware/auth')

/* GET users listing. */
router.get('/reads', handler.Catcher(controller.reads));
router.get('/read/:id', idCheck, handler.Catcher(controller.read));

// router.use(auth(["ADMIN"]))
router.get('/restore/:id', idCheck, handler.Catcher(controller.restore));
router.post('/create', validator(schemas.create), handler.Catcher(controller.create));
router.put('/update/:id', idCheck, handler.Catcher(controller.update));
router.delete('/delete/:id', idCheck, handler.Catcher(controller.delete));

module.exports = router;