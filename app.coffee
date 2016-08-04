Express = require 'express'
serve = require 'serve-static'
{resolve} = require 'path'

#middlewares
session = require 'express-session'
cookie = require 'cookie-parser'
logger = require 'morgan'
body = require 'body-parser'
#routes
api = require routes
admin = require routes + 'admin'

app = new Express
#app.use cookie()
app.use logger 'dev' if not production
app.use serve 'public' # static files
app.use body.urlencoded extended: false
app.use body.json()

app.use '/api', api # API routes
app.use '/admin', admin

module.exports = app
