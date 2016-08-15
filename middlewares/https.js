function httpsMiddleware(req, res, next) {
  production && (req.headers['x-forwarded-proto'] !== 'https')
    ? res.redirect('https://' + req.host + req.originalUrl)
    : next();
}

function httpsMiddlewareFactory(opts) {
  return httpsMiddleware;
}

module.exports = httpsMiddlewareFactory;
