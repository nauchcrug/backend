require('..');
const util = require('lib/util');
const {expect} = require('chai');

describe('xor', () => {
  [ // true combinations
    [true, false],
    [false, true]
  ].forEach(comb =>
    it(`${comb[0].toString()} and ${comb[1].toString()} should return true`, () =>
      expect(util.xor(comb[0], comb[1])).to.be.true
    )
  );

  [ // false combination
    false,
    true
  ].forEach(t =>
    it(`${t} and ${t} should be false`, () =>
      expect(util.xor(t, t)).to.be.false
    )
  );
});
