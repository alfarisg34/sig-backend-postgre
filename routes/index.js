var { Router } = require('express');
var router = Router();

router.get('/', function (_req, res, _next) {
    res.status(200).json({
      message: "api base url",
    })
  });

module.exports = router;