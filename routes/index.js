const {Router} = require('express');
const router = new Router;
>>>>>>> db06bb1a31dda74104ee09487c77ed2d9e15489b

router.use('/', require('./site'));
router.use('/api', require('./api'));
router.use('/cab', require('./admin'));

module.exports = router;
