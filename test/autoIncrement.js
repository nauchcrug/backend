const {expect} = require('chai');

class Increment {
  constructor() {
    this.number = 0;
  }
  toString() {
    let number = ++this.number;
    return number;
  }
}

describe('Incrementer', () => {
  const incr = new Increment();
  for (let i = 1; i <= 3; i++) {
    it('Return\'s +1', () => {
      const result = parseInt('' + incr);
      expect(result).to.eq(i);
    });
  }
});
