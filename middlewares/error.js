function NotFoundMiddleware(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorHandlerMiddleware(err, req, res, next) {
  res.status(err.status || 500);
  const {status, message} = err;
  req.headers.accept === 'application/json'
    ? res.json({message, status})
    : res.render('error', {err});
  next(); // Last middleware, just for fun :-)
}

function errorMiddlewareFactory() {
  return [
    NotFoundMiddleware,
    errorHandlerMiddleware
  ];
}

module.exports = errorMiddlewareFactory;
