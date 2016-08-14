const validate = require('./validate')

function log(data) {
  return new Promise((resolve, reject) => {
    console.log(data);
    resolve(data);
  });
}

exports.approve = (task) => {
  sql = '';
  return validate(task)
    .then(task => log(task))
    .catch(err => console.error(err));
}
