jwt = require 'express-jwt'
check = jwt
  secret: new Buffer process.env.AUTH0_CLIENT_SECRET, 'base64'
  audience: process.env.AUTH0_CLIENT_SECRET

module.exports = check
