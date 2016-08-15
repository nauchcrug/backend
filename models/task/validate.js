const ajv = require('ajv')();
const schema = require('./schema');

function validate(json) {
  // WARNING: JSON doesn't mean JSON, it mean's JS Object, that parsed from JSON
  json.number = parseInt(json.number); // get number from string (input workaround)
  return new Promise((resolve, reject) => ajv.validate(schema, json)
    ? resolve(json)
    : reject(ajv.errorsText())
  );
}

module.exports = validate;
