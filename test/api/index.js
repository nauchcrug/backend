const app = require('test/..');
const _ = require('lodash');
const {expect} = require('chai');
const request = require('supertest');

const agent = request.agent(app);

describe('API', () => {
    describe('POST /api/:id', () => _.times(3, i => it(
        `Returns \"${i}\"`,
        done => agent
            .post('/api/' + i)
            .expect(res => {
                const {id} = res.body;
                expect(id).to.be.a('string');
                expect(id).to.equal(`${i}`);
            })
            .end(err => done(err))
        )
    ));
});
