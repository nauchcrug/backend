const {Router} = require('express');
const {HttpError} = require('app/lib/errors');
router = new Router({
    mergeParams: true
});

const task = require('./task');
const subject = require('./subject');

if (!__PROD__) {
    router.all('/test', (req, res) => {
        throw new Error('test');
    });
}

module.exports = router
    .all('/', (req, res) => res.json({
        msg: 'Welcome!'
    }))
    .use('/task', task)
    .use('/subject', subject)
    .use(notImplemented)
    .use(errorHandler)

function notImplemented(req, res, next) {
    const err = new HttpError(501, 'Not implemented');
    err.name = 'NotImplementedError';
    err.message = 'Not implemented';
    err.stack = req.path || 'unknown path';
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json(err);
}

