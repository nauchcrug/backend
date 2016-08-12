const Express = require('express');
const serve = require('serve-static');

// Middlewares
const compression = require('compression');
const body = require('body-parser');
const helmet = require('helmet');
const session = require(middlewares + 'session');
const errorHandler = require(middlewares + 'error');
const api = require(routes + 'api');
const admin = require(routes + 'admin');
const site = require(routes + 'site');

app = new Express;
app.disable('x-powered-by');
app.set('views', templates);
app.set('view engine', 'pug');
if (!production) app.use(require('morgan')('dev'));
app.use(compression());
app.use(helmet());
app.use(body.urlencoded({
  extended: false
}));
app.use(body.json());
app.use(serve('public'));

// Routes
app.use('/', site);
app.use('/api', api);
app.use('/cab', admin);

app.use(errorHandler());
module.exports = app;
