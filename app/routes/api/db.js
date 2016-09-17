const {Router} = require('express');
const router = new Router;
const {db} = require('app/db');

const sql = 'select * from information_schema.tables';

router.get('/', (req, res, next) => {
  //res.set('Content-Type', 'application/json');
  db.query(sql)
    .then(data => res.json(data))
    .catch(err => next(err));
});

module.exports = router;
