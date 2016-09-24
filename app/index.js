const express = require('express');
const timeout = require('connect-timeout');
const compression = require('compression');
const helmet = require('helmet');
const body = require('body-parser');
const cookie = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// Middlewares
const error = require('app/middlewares/error');
const passport = require('app/passport');
const routes = require('app/routes');
const api = require('app/api');

const app = express();
app.set('views', 'app/views');
app.set('view engine', 'pug');
app.set('env', process.env.NODE_ENV || '');

/* TODO: Database in req object?
app.use((req, res, next) => {
  req.db = db;
});
*/

if (__DEV__) {
    if (!__TEST__) {
        const logger = require('morgan')('dev');
        app.use(logger);
    }
} else {
    /*app.disable('x-powered-by');*/
    app.set('view cache');

    /* Redirect to https */
    if (process.env.HTTPS != 0) app.use((req, res, next) => {
        return __PROD__ && req.get('x-forwarded-proto') != 'https'
            ? res.redirect(`https://${req.host}${req.originalUrl}`)
            : next();
    });
}


// Apply middlewares
app
    .use(timeout('5s'))
    .use(helmet()) /* Security */
    .use(cookie()) /* cookie-parser */
    .use(body.json())
    .use(body.urlencoded({extended: false}))
    .use(session({
        secret: process.env.AUTH0_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({
            url: process.env.REDIS_URL
        })
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(compression())
    .use(express.static('static', {
        maxAge: '365d'
    }));

app.use('/api', api); /* API */
routes(app); /* App routes */

module.exports = app;

