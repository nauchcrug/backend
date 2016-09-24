const passport = require('passport');
const Auth0Strategy = require('./auth0strategy');

/*
    SETUP PASSPORT
*/

passport.serializeUser((id, done) => {
    done(null, id);
});
passport.deserializeUser((id, done) => {
    done(null, id);
});

Auth0Strategy(passport);

module.exports = passport;
