function needAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.render('auth', {authorized: false});
  }
  next();
}

module.exports = needAuth;
