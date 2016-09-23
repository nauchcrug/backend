const chalk = require('chalk');

module.exports = app => app
  .use(NotFoundMiddleware)
  .use(errorHandlerMiddleware)

function jsonHandler(err, res) {
    res.json({
        message: err.message,
        status: err.status
    });
}

function htmlHandler(err, res) {
    if (__PROD__) {
        delete err.stack;
    }

    res.render('error', err);
}

function NotFoundMiddleware(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorHandlerMiddleware(err, req, res, next) {
    res.status(err.status || 500);

    if (!__DEV__) {
        err.message = 'Произошла ошибка. Попробуйте вернуться на главную страницу';
    }

    /* TODO: Fancy logging */
    if (!__TEST__) {
        console.error(chalk.underline.bold.red(err.message));
    }

    return /application\/json/.test(req.headers.accept)
        ? htmlHandler(err, res)
        : jsonHandler(err, res)
}

