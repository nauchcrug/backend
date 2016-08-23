function thunkMiddleware() {
  return (req, res, next) => next();
}

function loggerMiddleware() {
  return require('morgan')('dev'); // morgan as logger with 'dev' configuration
}

function loggerMiddlewareFactory() {
  return !production ? loggerMiddleware : thunkMiddleware;
}

module.exports = loggerMiddlewareFactory(); 
