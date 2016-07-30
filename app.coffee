express = require 'express'
app = express()
routes = require './routes'

app.get '/', (req, res) ->
  console.log "Request"
  res.send """
    <h1>Hello, world</h1>
  """

app.use '/api', routes

module.exports = app

