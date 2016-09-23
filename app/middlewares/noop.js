const err = new Error('Not implemented');
err.stack = null;

module.exports = function notImplemented(req, res, next) {
    next(err);
};
