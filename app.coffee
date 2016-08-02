Express = require 'express'
serve = require 'serve-static'
production = process.env.NODE_ENV is production
logger = require 'morgan'
body = require 'body-parser'
{resolve} = require 'path'

#routes
routes = require './routes'
admin = require './routes/admin'

app = new Express
app.use logger 'dev' if not production
app.use serve 'public' # static files
app.use body.json()
#app.use body.urlencoded()
app.use '/api', routes # API routes
app.use '/admin', admin

module.exports = app

