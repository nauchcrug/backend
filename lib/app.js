const Express = require('express');
const serve = require('serve-static');

// Middlewares
compression = require('compression');
body = require('body-parser');
helmet = require('helmet');
session = require(middlewares + 'session');
api = require(routes + 'api');
admin = require(routes + 'admin');
site = require(routes + 'site');

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

module.exports = app;
