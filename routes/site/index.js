const {Router} = require('express');
const router = new Router;
const exams = require('./exams');

router.get('/', (req, res) => {
  return res.render('site/index');
});

router.get('/test_error', (req, res) => {

});

router.use('/exams', exams);
module.exports = router;
