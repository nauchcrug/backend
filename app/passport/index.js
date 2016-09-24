const passport = require('passport');
const session = require('./session');
const strategy = require('./strategy');

strategy(passport);

module.exports = app => app
    .use(session)
    .use(passport.initialize())
    .use(passport.session())
