const {Router} = require('express');
const passport = require('passport');
const Auth0 = require('passport-auth0');
const session = require('./session');
const router = new Router;

const auth0 = new Auth0({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL
}, (accessToken, refreshToken, extraParams, profile, done) => {
  return done(null, profile);
});

passport.use(auth0);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.use(session());
router.use(passport.initialize());
router.use(passport.session());
module.exports = {
  auth: router,
  passport
};
