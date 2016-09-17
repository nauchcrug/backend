function NotFoundMiddleware(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorHandlerMiddleware(err, req, res, next) {
  res.status(err.status || 500);

  if (production) err.message = 'Произошла ошибка. Попробуйте вернуться на главную страницу';
  const {status, message} = err;

  //if (!test) console.error(err.stack);

  req.headers.accept === 'application/json'
    ? res.json({message, status})
    : res.render('error', {err});

  next(); // Last middleware, just for fun :-)
}

module.exports = app => app
  .use(NotFoundMiddleware)
  .use(errorHandlerMiddleware)

