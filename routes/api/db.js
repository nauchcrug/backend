const {Router} = require('express');
const router = new Router;
const {db} = require(lib + 'db');

const sql = 'select * from information_schemas.table';

router.get('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  db.query(sql)
    .then(data => res.json(data))
    .catch(err => console.error(err));
});

module.exports = router;
