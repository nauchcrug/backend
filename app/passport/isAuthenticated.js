module.exports = function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        throw new AuthError;
    }
}
