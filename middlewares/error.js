function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    err
  });
}

function NotFound(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
}

module.exports = function() {
  return [
    NotFound,
    errorHandler
  ];
}
