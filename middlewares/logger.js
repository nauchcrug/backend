const morgan = require('morgan');
const logger = morgan('dev');
const thunk = (err, req, res, next) => next();

module.exports = function() {
  if (!production) {
    return logger;
  } else {
    return thunk;
  }
};