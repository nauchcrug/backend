module.exports = {
    HttpError
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
