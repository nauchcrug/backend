Express = require 'express'
serve = require 'serve-static'
{resolve} = require 'path'
routes = require './routes'
admin = require './routes/admin'
# {RoutingContext, match} = require 'react-router'

app = new Express

app.use serve 'public' # static files
#app.get '*', (req, res,) #React router middleware

app.use '/api', routes # API routes
app.use '/admin', admin # Admin routes

module.exports = app

