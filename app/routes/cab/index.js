const {Router} = require('express');
const serve = require('serve-static');

const user = require('./user');

module.exports = router = new Router;

router.use('/static',
    serve('node_modules/admin-lte', {
        maxAge: '365d'
    }),
    serve('node_modules/tinymce', {
        maxAge: '365'
    })
);

router
    .get('/', (req, res) => res.render('cab/index'))
    .get('/add', (req, res) => res.render('cab/add'))
    .get('/table', (req, res) => res.render('cab/table'))
    .get('/control', (req, res) => res.render('cab/controlteam'))
    .get('/addpage', (req, res) => res.render('cab/addpage'))
    .get('/addnews', (req, res) => res.render('cab/addnews'))
    .get('/bank', (req, res) => res.render('cab/bank'))
    .use('/user', user);
