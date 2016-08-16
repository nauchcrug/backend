const {Router} = require('express');
const router = new Router;

// APIs
const db = require('./db');
const auth = require('./auth');
const converter = require('./converter');
const task = require('./task');

// Endpoints
router.use('/db', db);
router.use('/auth', auth);
router.use('/converter', converter);
router.use('/task', task);

!production ? router.use('/test', require('./test')) : void 0;

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

module.exports = router;
