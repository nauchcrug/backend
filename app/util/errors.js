module.exports = {
    HttpError, NotImplementedError
}

function NotImplementedError(req) {
    Error.apply(this);
    this.name = 'NotImplementedError';
    this.message = 'Not implemented';
    this.stack = req.path || 'unknow path';
    this.status = 500;
}

function HttpError(status, message) {
    Error.apply(this);
    this.name = 'HttpError';
    if (message) {
        this.status = status;
        this.message = message;
    } else {
        this.status = 500;
        this.message = status;
    }
    Error.captureStackTrace(this, HttpError);
}
