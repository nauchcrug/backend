const validate = require('./validate')

exports.approve = (task) => {
  sql = '';
  return validate(task)
    .then(task => console.log(task))
}
