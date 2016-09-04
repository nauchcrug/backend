const {Router} = require('express');
const serve = require('serve-static');
const router = new Router;
const auth = require('../api/auth/index');
const user = require('./user');
const requireAuth = require('../../lib/requireAuth');

//const register = require('./register');
router.use('/static', [
  serve('node_modules/admin-lte'),
  serve('node_modules/tinymce')
]);

router.get('/', requireAuth, (req, res) => res.render('cab/index'));
router.get('/add', (req, res) => res.render('cab/add'));
router.get('/table', (req, res) => res.render('cab/table'));
router.get('/control', (req, res) => res.render('cab/controlteam'));
router.get('/addpage', (req, res) => res.render('cab/addpage'));
router.get('/addnews', (req, res) => res.render('cab/addnews'));
router.get('/bank', (req, res) => res.render('cab/bank'));
router.use('/user', user);
router.use('/auth', auth);
//router.use('/register',register);
module.exports = router;
