const {Router} = require('express');
const router = new Router;

const db = require(routes + 'api/db');
const get_old = require('./get_old');
const task = require('./task');

router.use('/db', db);
router.use('/old', get_old);
router.use('/task', task);

router.get('/', function(req, res) {
  return res.json({
    message: 'asga Hasglo, world 21'
  });
});

router.post('/', function(req, res) {
  var id;
  id = req.body.id;
  console.log(id);
  return res.json(id);
});

router.get('/isprod', function(req, res) {
  var NODE_ENV;
  NODE_ENV = process.env.NODE_ENV;
  console.log(NODE_ENV);
  return res.json({
    production: NODE_ENV
  });
});

module.exports = router;
