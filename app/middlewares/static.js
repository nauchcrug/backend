const serve = require('serve-static');
const {assign} = require('lodash');

const defaultOpts = {
    maxAge: '365d',
};

module.exports = (path, opts) => {
    const mergedOpts = assign(defaultOpts, opts);
    return serve(path, mergedOpts);
};
