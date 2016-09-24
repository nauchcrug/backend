const passport = require('passport');
const session = require('./session');
const Auth0Strategy = require('./auth0strategy');

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

Auth0Strategy(passport);

module.exports = passport;
/*  .use(session)
    .use(passport.initialize())
    .use(passport.session())
*/
