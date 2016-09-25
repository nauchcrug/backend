const {Router} = require('express');
const {HttpError} = require('app/lib/errors');
const router = new Router({
    mergeParams: true
});

const task = require('./task');
const subject = require('./subject');

if (__DEV__) {
    router.all('/test', (req, res) => {
        const err = new Error('test');
        err.status = 500;
        throw err;
    });
}

module.exports = router
    .all('/', root)
    .use('/task', task)
    .use('/subject', subject)
    .use(notImplemented)
    .use(errorHandler)

function root(req, res) {
    res.json({
        msg: 'Welcome!'
    })
}

function notImplemented(req, res, next) {
    //const err = new NotImplementedError(req);
    const err = new HttpError(501, 'Not implemented');
    err.name = 'NotImplementedError';
    err.message = 'Not implemented';
    err.stack = req.path || 'unknown path';
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json(err);
}

