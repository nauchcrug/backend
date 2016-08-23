const ajv = require('ajv')();
const schema = require('./schema');

function validate(data) {
  // WARNING: JSON doesn't mean JSON, it mean's JS Object, that parsed from JSON
  return new Promise((resolve, reject) => ajv.validate(schema, data)
    ? resolve(data)
    : reject(ajv.errorsText())
  );
}

module.exports = validate;
