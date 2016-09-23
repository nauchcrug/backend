const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const body = require('body-parser');
const cookie = require('cookie-parser');

// Middlewares
const serve = require('app/middlewares/static');
const session = require('app/middlewares/session');
const https = require('app/middlewares/https');
const error = require('app/middlewares/error');
const routes = require('app/routes');

const app = express();

// Views
app.set('views', 'app/views');
app.set('view engine', 'pug');

/* TODO: Database in req object
app.use((req, res, next) => {
  req.db = db;
});
*/

if (__DEV__) {

    if (!__TEST__) {

    /* Log requests */
        const logger = require('app/middlewares/logger');
        logger(app);
    }

} else {

    /*app.disable('x-powered-by');*/
    app.set('view cache');

    /* Redirect to https */
    https(app);

}


// Apply middlewares
app
    .use(helmet()) /* Security */
    .use(cookie()) /* cookie-parser */
    .use(body.json())
    .use(body.urlencoded({
        extended: false
    }))
    .use(compression())
    .use(serve('static', {
        maxAge: '365d'
    }))

session(app); /* Session middleware */
routes(app); /* App routes */
error(app); /* Error handler */

module.exports = app;

