const app = require('test/..');
const {iterate} = require('lib/util');
const {expect} = require('chai');
const request = require('supertest');

const agent = request.agent(app);

describe('API', () => {
  describe('POST /api/:id', () => iterate(3, i => it(`Returns \'${i}\'`, done => { agent
    .post('/api/' + i)
    .expect(res => {
      const {id} = res.body;
      expect(id).to.be.a('string');
      expect(id).to.equal(`${i}`);
    })
    .end(err => done(err));
  })));
});
