const {Router} = require('express');
const router = new Router;
const fetch = require('node-fetch');
const url = `http://nauchcrug.shn-host.ru/convert.php?sub=ex_`;

router.get('/page/:exam', (req, res) => {
  const {exam} = req.params;
  const subject = `ex_${exam}`;
  const url = `http://nauchcrug.shn-host.ru/convert.php?sub=ex_${exam}`;
  fetch(url)
    .then(data => data.text())
    .then(str => str.trim())
    .then(json => JSON.parse(json))
    .then(obj => res.render('site/exam', {tasks: obj, exam, subject}))
    .catch(err => console.error(err.message));
});

router.get('/:exam', (req, res) => {
  const {exam} = req.params || '';
  fetch(url + exam)
    .then(data => data.text())
    .then(str => str.trim())
    .then(json => JSON.parse(json))
    .then(obj => res.json(obj))
    .catch(err => console.error(err));
});

module.exports = router;
