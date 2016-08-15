function https(req, res, next) {
  console.log(req.headers['x-forwarded-proto']);
  production && (req.headers['x-forwarded-proto'] !== 'https')
    ? res.redirect('https://' + req.host + req.originalUrl)
    : next();
}

function factory(opts) {
  return https;
}

module.exports = factory;
