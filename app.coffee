express = require 'express'
{resolve} = require 'path'
app = express()
routes = require './routes'
admin = require './routes/admin'

#app.get '*', (req, res) ->
#  res.sendFile resolve 'public/index.html'

app.use express.static 'public'
app.use '/api', routes
app.use '/admin', admin

module.exports = app

