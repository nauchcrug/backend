const passport = require('passport');
const Auth0Strategy = require('./auth0strategy');
//const db = require('app/db');
//const User = db.model('User');

/*
    SETUP PASSPORT
*/

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    /*User.load({
        criteria: {
            _id: id
        }
    }, done)*/
    done(null, id);
});

Auth0Strategy(passport);

module.exports = passport;
