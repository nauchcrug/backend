const schema = require('./schema');
const ajv = require('ajv')();
const {toNumber} = require('lodash')

function validate(json) {
  //const task = toNumber(json.task);
  //task != 0 ? task : json.task //workaround for number in string
  json.task = parseInt(json.task);
  return new Promise((resolve, reject) => ajv.validate(schema, json)
    ? resolve(json)
    : reject(ajv.errorsText())
  );
}

module.exports = validate;
