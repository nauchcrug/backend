const express = require('express');

const routes = require('routes');
//const middlewares = require('middlewares');

// Middlewares
const compression = require('compression');
const body = require('body-parser');
const helmet = require('helmet');
//const session = require('middlewares/session');
const error = require('middlewares/error');
const logger = require('middlewares/logger');
const https = require('middlewares/https');
const upload = require('middlewares/upload');
const serve = require('serve-static');

const passport = require('passport');
const strategy = require('./strategy');
const cookieparser = require('cookie-parser');
const sess = require('express-session');


// Routes
/*const api = require('routes/api');
const admin = require('routes/admin');
const site = require('routes/site');
*/

app = express();
app.disable('x-powered-by');

// Apply middlewares
app.use([
  https(),
  logger(),
  helmet(),
  //session(),
  compression(),
  body.json(),
  body.urlencoded({extended: false}),
  upload(),
    cookieparser(),
    sess({ secret: process.env.AUTH0_CLIENT_SECRET, resave: false,  saveUninitialized: false }),
    passport.initialize(),
    passport.session(),
  serve('public')
]);

// Views
app.set('views', 'views');
app.set('view engine', 'pug');
app.set('view cache');

//app.use(middlewares());


app.use(routes);
app.use(error()); // Error handler must be last
module.exports = app;

