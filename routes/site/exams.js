const {Router} = require('express');
const router = new Router;
exam = require(models + 'exam');

router.get('/', (req, res) => {
  res.render('site/subj');
});

router.get('/:subject', (req, res) => {
  let {subject} = req.params;
  res.render('site/subject', {
    subject
  });
});

router.get('/:subject/:exam', (req, res) => {
  let {subject, exam} = req.params;
  exam.get(subject, exam)
    .then(data => res.json(data))
    .catch(err => console.error(err));
});

module.exports = router;
