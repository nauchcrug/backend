const {Router} = require('express');
const router = new Router;

function genRoute(verb, endpoint, basepath) {}

router.get('/', (req, res) => res.render('cab/user/profile'));
router.get('/login', (req, res) => res.render('cab/user/login'));
router.get('/register', (req, res) => res.render('cab/user/register'));
router.get('/stats', (req, res) => res.render('cab/user/modstat'));

module.exports = router;
