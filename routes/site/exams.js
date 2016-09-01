const {Router} = require('express');
const router = new Router;
//Exam = require('models/exam');
const oldApi = require('lib/oldApi');

router.get('/', (req, res) => {
  res.render('site/allExams'); // List of subjects
});

router.get('/:subject', (req, res, next) => {
  const {subject} = req.params;
  oldApi(subject)
  .then(obj => {
    res.render('site/exam', {
      subject,
      tasks: obj
    });
  })
  .catch(err => next(err));
});

module.exports = router;
