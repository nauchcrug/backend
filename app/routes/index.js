const chalk = require('chalk');

const {HttpError} = require('app/lib/errors');
const site = require('app/routes/site');
const cab = require('app/routes/cab');

/* Apply endpoints */
module.exports = app => app
    .use('/', site)
    .use('/cab', cab)
    .use(NotFoundMiddleware)
    .use(errorHandler)

function NotFoundMiddleware(req, res, next) {
    let err = new HttpError(404, 'Страница не найдена');
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(err.status || 500)

    if (__PROD__) {
        delete err.stack;
    } else if (!__TEST__) {
        console.error(chalk.underline.bold.red(err.message));
    }

    res.render('error', {err})
}

