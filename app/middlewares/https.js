function httpsMiddleware(req, res, next) {
  production && (req.headers['x-forwarded-proto'] !== 'https')
    ? res.redirect('https://' + req.host + req.originalUrl)
    : next();
}

module.exports = app => app.use(httpsMiddleware)
