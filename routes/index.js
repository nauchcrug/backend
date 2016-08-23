const router = require('express').Router();

router.use('/', require('./site'));
router.use('/api', require('./api'));
router.use('/cab', require('./admin'));

module.exports = router;
