const {Router} = require('express');
module.exports = router = new Router;
const {log} = require('app/lib/util');

// APIs
const db = require('./db');
const converter = require('./converter');
const task = require('./task');

// Endpoints
router.use('/db', db);
router.use('/converter', converter);
router.use('/task', task);

if (!production) router.use('/test', require('./test'))

/**
 * @api {get} / Hello, world!
 * @apiName HelloWorld
 * @apiGroup root
 *
 * @apiSuccess {String} message Hello, world!
 */
router.get('/', function(req, res) {
  return res.json({
    message: 'asga Hasglo, world 21'
  });
});

/**
 * @api {post} /:id Return's ID :-)
 * @apiName Echo ID
 * @apiGroup root
 *
 * @apiParam {Number} id echoe'd ID
 *
 * @apiSuccess {Number} id ID
 */
router.post('/:id', function(req, res) {
  const {id} = req.params;
  log(id);
  return res.json({id});
});

