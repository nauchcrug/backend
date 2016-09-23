const morgan = require('morgan');
const logger = morgan('dev');

module.exports = app => app.use(logger);
