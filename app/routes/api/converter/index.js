const {Router} = require('express');
module.exports = router = new Router;
const fetch = require('node-fetch');
const oldApi = require('app/lib/oldApi');

router.get('/page/:subject', (req, res) => {
  const {subject} = req.params;
  oldApi(subject, (obj, err) => {
    if (err !== 200) throw obj;
    else res.render('site/exam', {
      subject,
      tasks: obj
    });
  });
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
  const {subject} = req.params;
  oldApi(subject, (obj, err) => {
    console.log(obj);
    if (err !== 200) console.error(obj);
    else res.json({
      tasks: obj,
      subject
    });
  });
});

