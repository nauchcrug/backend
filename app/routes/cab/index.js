const {Router} = require('express');
const serve = require('serve-static');
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
    .get('/bank', (req, res) => res.render('cab/bank'))
    .get('/table', (req, res) => res.render('cab/table'))
    .get('/team', (req, res) => res.render('cab/team'))
    .get('/stats', (req, res) => res.render('cab/stats'))
    /* TODO: Some CRUD
    .use('/task', task)
    .use('/subject', subject)
    .use('/user', user)
    */
