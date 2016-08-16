const {Router} = require('express');
const router = new Router;

const post = require('./post');
const get = require('./get');
const put = require('./put');

router.get('/:id', get);
router.put('/:id', put);
router.post('/', post);
module.exports = router;
