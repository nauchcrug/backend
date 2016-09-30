const {Router} = require('express');
const exams = require('./exams');
module.exports = router = new Router;

router
    .use('/exam', exams)
    .get('/', (req, res) => res.render('site/index'))
