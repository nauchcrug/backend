fs = require 'fs'

options =
  connect: (client, dc, isFresh) ->
    cp = client.connectionParameters
    console.log "Connected to database #{cp.database}"
  extend: (db, dc) ->
    for modelName in fs.readdirSync 'models' when /\.(coffee|js)/.test modelName
      modelName = modelName.replace /\.coffee/, ''
      modelObj = require models + modelName
      @[modelName] = {}
      for prop, func of modelObj
        @[modelName][prop] = func.bind db


pgp = require('pg-promise') options
{parse} = require 'pg-connection-string'
url = process.env.DATABASE_URL

# SSL fix
config = parse url
config.ssl = on

db = pgp config
module.exports = db
