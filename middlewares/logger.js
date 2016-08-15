function thunk() {
  return (req, res, next) => next();
}

function morgan() {
  return require('morgan')('dev');
}

/*function logger(opts) {
  return !production
    ? morgan
    : thunk
}*/

module.exports = !production ? morgan : thunk; 
