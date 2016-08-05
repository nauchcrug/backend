redis = require 'connect-redis'
session = require 'express-session'

module.exports = (options) ->
  options =
    url: process.env.REDIS_URL
  RedisStore = redis session
  session
    store: new RedisStore options
    secret: process.env.AUTH0_SECRET

