function https(req, res, next) {
  console.log(req.protocol);
  if (production && (req.protocol !== 'https')) {
    res.redirect('https://' + req.host + req.originalUrl);
  } else {
    next();
  }
}

function factory(opts) {
  return https;
}

module.exports = factory;
