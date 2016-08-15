const validate = require('./validate');
const {db} = require('lib/db')

exports.approve = (task) => {
  sql = '';
  return validate(task); // Promise
  // TODO: db.query
}
