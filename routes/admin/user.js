const {Router} = require('express');
const router = new Router;

router.get('/', (req, res) => res.render('cab/profile'));
router.get('/login', (req, res) => res.render('cab/login'));
router.get('/register', (req, res) => res.render('cab/addUser'));

module.exports = router;
