const {Router} = require('express');
const router = new Router;
const exams = require('./exams');

router.get('/', (req, res) => {
  return res.render('site/index');
});

router.use('/exams', exams);
module.exports = router;
