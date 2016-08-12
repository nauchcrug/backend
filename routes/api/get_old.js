const {Router} = require('express');
const router = new Router;
const fetch = require('isomorphic-fetch');
const tomd = require('to-markdown');

router.get('/tomd/:exam', (req, res) => {
  const {exam} = req.params;
  const subject = `ex_${exam}`;
  const url = `http://nauchcrug.shn-host.ru/convert.php?sub=ex_${exam}`;
  fetch(url)
    .then(data => data.text())
    .then(str => str.trim())
    .then(json => JSON.parse(json))
    .then(obj => obj.map(i => {
      i.text = tomd(i.text);
      return i;
    }))
    .then(obj => res.json(obj))
    .catch(err => console.error(err.message));
});

router.get('/page/:exam', (req, res) => {
  const {exam} = req.params;
  const subject = `ex_${exam}`;
  const url = `http://nauchcrug.shn-host.ru/convert.php?sub=ex_${exam}`;
  fetch(url)
    .then(data => data.text())
    .then(str => str.trim())
    .then(json => JSON.parse(json))
    .then(obj => obj.map(i => {
      i.text = tomd(i.text);
      return i;
    }))
    .then(obj => res.render('site/exam', {tasks: obj, exam}))
    .catch(err => console.error(err.message));
});

router.get('/:exam', (req, res) => {
  const {exam} = req.params;
  const url = `http://nauchcrug.shn-host.ru/convert.php?sub=ex_${exam}`;
  res.set('Content-Type', 'application/json');
  res.set('Accept', 'application/json');
  options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  fetch(url, options)
    .then(data => data.text())
    .then(str => str.trim())
    .then(json => JSON.parse(json))
    .then(obj => res.json(obj))
    .catch(err => console.error(err));
});

module.exports = router;
