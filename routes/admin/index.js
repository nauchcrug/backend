const {Router} = require('express');
const serve = require('serve-static');
const router = new Router;

function vendor(name) {
  return serve(`node_modules/${name}`);
}

//const profile = require('./profile');   Разкомменить
//router.use('/profile', profile);
router.use('/static', [
  serve('node_modules/admin-lte'),
  serve('node_modules/tinymce')
]);

router.get('/', (req, res) => res.render('cab/index'));
router.get('/register', (req, res) => res.render('cab/addUser'));
router.get('/add', (req, res) => res.render('cab/add'));
router.get('/table', (req, res) => res.render('cab/table'));
router.get('/profile', (req, res) => res.render('cab/profile'));
module.exports = router;

