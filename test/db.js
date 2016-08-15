require('..');
const {expect} = require('chai');
const {db} = require('lib/db');

describe('Models', () => {
  ['task'].forEach(name => {
    it(`model \'${name}\' should be object`, () => {
      let model = require(`models/${name}`);
      expect(model).to.be.an('object');
    });
  });
});
