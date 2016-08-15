const redis = require('connect-redis');
const session = require('express-session');

function sessionMiddleware() {
  const options = {
    url: process.env.REDIS_URL
  };
  const RedisStore = redis(session);
  return session({
    store: new RedisStore(options),
    secret: process.env.AUTH0_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
  });
}

module.exports = sessionMiddleware;
