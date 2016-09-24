const chalk = require('chalk');
const {HttpError} = require('app/util/errors');

module.exports = app => app
  .use(NotFoundMiddleware)
  .use(errorHandlerMiddleware);

function NotFoundMiddleware(req, res, next) {
    let err = new HttpError(404, 'Страница не найдена');
    next(err);
}

function errorHandlerMiddleware(err, req, res, next) {
    res.status(err.status || 500);

    if (__PROD__) {
        delete err.stack;
    } else if (!__TEST__) {
        console.error(chalk.underline.bold.red(err.message));
    }

    res.status(err.status);
    res.format({
        html() {
            res.render('error', {err});
        },
        json() {
            res.json({err});
        }
    });
}

