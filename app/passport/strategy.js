const Auth0 = require('passport-auth0');

const auth0 = new Auth0({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
});

const serializeUser = (user, done) => done(null, user);
const deserializeUser = (user, done) => done(null, user);

module.exports = p => {
    p.serializeUser(serializeUser)
    p.deserializeUser(deserializeUser)
    return p
        .use(auth0)
}
