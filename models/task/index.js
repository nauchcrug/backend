const validate = require('./validate');
const {db} = require('lib/db');

exports.approve = (task) => {
  sql = '';
  return validate(task); // Promise
    //.then(task => db.query(sql, task));
  // TODO: db.query
};
