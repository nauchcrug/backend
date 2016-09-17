const createRedisStore = require('connect-redis');
const session = require('express-session');

const options = {
  url: process.env.REDIS_URL
};

const RedisStore = createRedisStore(session);
const sessionMiddleware = session({
  store: new RedisStore(options),
  secret: process.env.AUTH0_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
});

module.exports = app => app
  .use(sessionMiddleware())
