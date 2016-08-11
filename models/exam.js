const {db} = require(lib + 'db');

exports.add = function() {
  db.query(sql)
    .then(data => {})
    .catch(err => {
      if (err) throw err
    })
};