Express = require 'express'
serve = require 'serve-static'
{resolve, join} = require 'path'
{cwd} = process
redis = require 'connect-redis'

#middlewares
compression = require 'compression'
body = require 'body-parser'
helmet = require 'helmet'
session = require middlewares + 'session'

#routes
api = require routes + 'api'
admin = require routes + 'admin'
site = require routes + 'site'

app = new Express
app.disable 'x-powered-by'
app.set 'views', join cwd(), 'templates'
app.set 'view engine', 'pug'

if not production
  app.use require('morgan') 'dev'

app.use compression()
app.use helmet()
#app.use session()
app.use body.urlencoded extended: false
app.use body.json()
app.use serve 'public' # static files
app.use '/', site
app.use '/api', api # API routes
app.use '/admin', admin

module.exports = app
