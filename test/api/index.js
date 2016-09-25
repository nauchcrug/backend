const {expect} = require('chai');
const agent = require('test/agent');

describe('API', () => {
    it(`JSON error (/api/error)`, done => agent
        .get('/api/')
        .expect(({body}) => {
            expect(body).to.be.an('object');
            expect(body.msg).to.be.ok;
            expect(body.msg).to.equal('Welcome!');
        })
        .end(done)
    )
});
