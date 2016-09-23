const {Router} = require('express');
const router = new Router;
const exams = require('./exams');

router.get('/', (req, res) => {
    res.render('site/index');
});

router.get('/test_error', (req, res) => {
    throw new Error('test');
});

router.use('/exam', exams);
module.exports = router;

