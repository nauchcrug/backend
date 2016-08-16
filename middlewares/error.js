function isJson(accept) {
  //return req.type === json;
  console.log(accept);
  return accept === 'application/json';
}

function errorHandlerMiddleware(err, req, res, next) {
  res.status(err.status || 500)
  isJson(req.headers.accept)
    ? res.json({message: err.message})
    : res.render('error', {err})
  next(); // Last middleware, just for fun :-)
}

function NotFoundMiddleware(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorMiddlewareFactory() {
  return [
    NotFoundMiddleware,
    errorHandlerMiddleware
  ];
}

module.exports = errorMiddlewareFactory;
