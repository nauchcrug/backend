const {Router} = require('express');
const serve = require('serve-static');
module.exports = router = new Router;

const user = require('./user');

router.use('/static', [
  serve('node_modules/admin-lte'),
  serve('node_modules/tinymce')
]);


router.get('/', function(req,res){
    res.render('cab/index',{
        pageTitle: 'Личный кабинет - Науч.Круг',
        fullname: 'Maxim'
    })
})

router.get('/add', (req, res) => res.render('cab/add'));
router.get('/table', (req, res) => res.render('cab/table'));
router.get('/control', (req, res) => res.render('cab/controlteam'));
router.get('/addpage', (req, res) => res.render('cab/addpage'));
router.get('/addnews', (req, res) => res.render('cab/addnews'));
router.get('/bank', (req, res) => res.render('cab/bank'));
router.use('/user', user);
