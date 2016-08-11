const {expect} = require('chai');
require('../lib/globalize');
const db = require('../lib/db');

describe('DI of models', () => {
  ['user', 'exam'].forEach(name => {
    it(`type of model ${name} should be object`, () => {
      let model = require(models + name);
      expect(model).to.be.an('object');
    });
  });
});
