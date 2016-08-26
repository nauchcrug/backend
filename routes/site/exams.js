const {Router} = require('express');
const router = new Router;
//Exam = require('models/exam');
const oldApi = require('lib/oldApi');

router.get('/', (req, res) => {
  res.render('site/allExams'); // List of subjects
});

router.get('/:subject', (req, res) => {
  const {subject} = req.params;
  oldApi(subject, (obj, err) => {
    if (err !== 200) throw obj;
    else res.render('site/exam', {
      subject,
      tasks: obj
    });
  });
});

module.exports = router;
