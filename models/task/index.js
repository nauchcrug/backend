const validate = require('./validate');
const {db} = require('lib/db');

exports.add = (task) => {
  sql = '';
  return validate(task); // Promise
  // TODO: db.query
};

exports.approve = (id, approved) => {
  sql = 'update approved from tasks where id=$1';
  const bit = approved ? 1 : 0;
  return db.query(sql, [id, bit]);
};
