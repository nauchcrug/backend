const {Router} = require('express');
const serve = require('serve-static');
const router = new Router;

const user = require('./user');
//const register = require('./register');
router.use('/static', [
  serve('node_modules/admin-lte'),
  serve('node_modules/tinymce')
]);

router.get('/', (req, res) => res.render('cab/index'));
router.get('/add', (req, res) => res.render('cab/add'));
router.get('/table', (req, res) => res.render('cab/table'));
router.get('/control', (req, res) => res.render('cab/controlteam'));
router.get('/addpage', (req, res) => res.render('cab/addpage'));
router.get('/addpage', (req, res) => res.render('cab/addnews'));
router.use('/user', user);
//router.use('/register',register);
module.exports = router;
