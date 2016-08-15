function https(req, res, next) {
  console.log(req.headers['x-forwarded-proto']);
  if (production && (req.headers['x-forwarded-proto'] !== 'https')) {
    res.redirect('https://' + req.host + req.originalUrl);
  } else {
    next();
  }
}

function factory(opts) {
  return https;
}

module.exports = factory;
