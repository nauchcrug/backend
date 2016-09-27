const ajv = require('ajv')();

module.exports = function validate(data) {
    return new Promise((resolve, reject) => {
        if (ajv.validate(schema, data)) {
            resolve(data);
        } else {
            reject(ajv.errorsText());
        }
    });
}
