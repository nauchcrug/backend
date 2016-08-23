const {Router} = require('express');
const router = new Router;

router.use('/', require('./site'));
router.use('/api', require('./api'));
router.use('/cab', require('./admin'));

module.exports = router;
