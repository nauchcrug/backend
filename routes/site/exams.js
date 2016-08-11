const {Router} = require('express');
const router = new Router;
exam = require(models + 'exam');

router.get('/', (req, res) => {
  return res.render('site/subj');
});

router.get('/:subject', (req, res) => {
  let {subject} = req.params;
  res.render('site/subject', {
    subject: subject
  });
});

router.get('/:subject/:exam', (req, res) => {
  let {subject, exam} = req.params;
  db.exam.get(subject, exam)
    .then(data => res.data())
    .catch(err => {
      if (err) throw err;
    });
});

module.exports = router;
