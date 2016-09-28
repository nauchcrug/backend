module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        throw new Error('auth failed');
    }
}
