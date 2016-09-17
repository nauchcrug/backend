const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const body = require('body-parser');
const cookie = require('cookie-parser');

// Middlewares
const session = require('app/middlewares/session');
const https = require('app/middlewares/https');
const error = require('app/middlewares/error');
const routes = require('app/routes');

const app = express()
//app.disable('x-powered-by');
// Views
app.set('views', 'app/views');
app.set('view engine', 'pug');
app.set('view cache');

if (!production) {

  if (!test) {
    /* Log requests */
    const logger = require('app/middlewares/logger');
    logger(app);
  }

} else {
  /* Redirect to https */
  https(app);
}


// Apply middlewares
app.use([
  helmet(),
  cookie(),
  compression(),
  body.json(),
  body.urlencoded({extended: false}),
  express.static('public')
]);

session(app);
routes(app); /* Apply endpoints */
error(app); /* Apply error handler */

module.exports = app;

