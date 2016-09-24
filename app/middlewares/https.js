function httpsMiddleware(req, res, next) {
    if (__PROD__ && (req.headers['x-forwarded-proto'] !== 'https')) {
        return res.redirect(`https://${req.host}${req.originalUrl}`);
    } else {
        return next();
    }
}

module.exports = app => app
    .use(httpsMiddleware)
