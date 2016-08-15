const Express = require('express');
const serve = require('serve-static');

// Middlewares
const compression = require('compression');
const body = require('body-parser');
const helmet = require('helmet');
const session = require('middlewares/session');
const errorHandler = require('middlewares/error');
const logger = require('middlewares/logger');

// Routes
const api = require('routes/api');
const admin = require('routes/admin');
const site = require('routes/site');

app = new Express;
app.disable('x-powered-by');
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(logger());
app.use(helmet());
app.use(compression());
app.use(body.json());
app.use(body.urlencoded({
  extended: false
}));
app.use(serve('public'));

// Endpoints
app.use('/', site);
app.use('/api', api);
app.use('/cab', admin);

app.use(errorHandler());
module.exports = app;
