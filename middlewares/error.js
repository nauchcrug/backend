function errorHandle(err, req, res, next) {
  if (err) console.error(err);
  next();
}

module.exports = function() {
  return errorHandle;
};