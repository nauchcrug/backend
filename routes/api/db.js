const {Router} = require('express');
const router = new Router;
const {db} = require(lib + 'db');

ref = ['exams', 'tasks', 'users'];
for (i = 0, len = ref.length; i < len; i++) {
  table = ref[i];
  sql = {
    tables: 'select * from ' + table
  };
}

router.get('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  db.query(sql)
    .then(data => res.json(data))
    .catch(err => {
      if (err) throw err;
  });
});

module.exports = router;
