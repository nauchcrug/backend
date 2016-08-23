const {Router} = require('express');
const router = new Router;
const fetch = require('node-fetch');
const url = 'http://nauchcrug.shn-host.ru/convert.php?sub=';

router.get('/page/:subject', (req, res) => {
  const {subject} = req.params;
  const url = `http://nauchcrug.shn-host.ru/convert.php?sub=_${exam}`;
  fetch(url + subject)
    .then(data => data.text())
    .then(str => str.trim())
    .then(json => JSON.parse(json))
    .then(obj => res.render('site/exam', {tasks: obj, exam, subject}))
    .catch(err => console.error(err.message));
});

/**
 * @api {get} /converter/:subject Return's subject from old PHP version
 * @apiName GetSubject
 * @apiGroup Subject
 *
 * @apiParam {String} subject Subject name (e.g.: rus, math, inf)
 *
 * @apiSuccess {Object} Subject
 */
router.get('/:subject', (req, res) => {
  const {subject} = req.params || '';
  fetch(url + subject)
    .then(data => data.text())
    .then(json => {
      console.log(json);
      return json.trim();
    })
    .then(json => JSON.parse(json))
    .then(data => res.json(data))
    .catch(err => res.json({message: err.message}));
});

module.exports = router;
