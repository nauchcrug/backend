const {Router} = require('express');
const {HttpError, NotImplementedError} = require('app/util/errors');
const router = new Router({
    mergeParams: true
});

const task = require('./task');
const subject = require('./subject');

module.exports = router
    .use(configureApi)
    .use('/test', test)
    .use('/task', task)
    .use('/subject', subject)
    .use(notImplemented);

function test(req, res) {
    const err = new Error('test');
    err.status = 500;
    throw err;
}

function configureApi(req, res, next) {
    /*res.type('json');*/
    next();
}

function notImplemented(req, res, next) {
    const err = new NotImplementedError(req);
    next(err);
}



