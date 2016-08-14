const schema = require('./schema');
const ajv = require('ajv')();

function validate(json) {
  return new Promise((resolve, reject) => ajv.validate(schema, json)
    ? resolve(json)
    : reject(ajv.errorsText())
  );
}

module.exports = validate;
