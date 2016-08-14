const {Router} = require('express');
const router = new Router;
const post = require('./post');
const get = require('./get');

router.get('/:task', get);
router.post('/', post);
module.exports = router;
