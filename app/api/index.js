const {Router} = require('express');
const {HttpError} = require('app/util/errors');
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
}

function configureApi(req, res, next) {
    /*res.type('json');*/
    next();
}

function notImplemented(req, res, next) {
    const err = new Error('Not implemented');
    err.stack = req.path;
    err.status = 500;
    next(err);
}



