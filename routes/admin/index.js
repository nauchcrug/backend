const {Router} = require('express');
const serve = require('serve-static');
const router = new Router;

const profile = require('./profile');
router.use('/static', serve('node_modules/admin-lte'));
router.use('/profile', profile);
router.get('/', (req, res) => {
  res.render('cab/index');
});

module.exports = router;
