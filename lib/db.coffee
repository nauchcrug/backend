fs = require 'fs'

options =
  extend: (db, dc) ->
    for modelName in fs.readdirSync 'models' when /\.(coffee|js)/.test modelName
      modelName = modelName.replace /\.coffee/, ''
      modelObj = require models + modelName
      @[modelName] = {}
      for prop, func of modelObj
        @[modelName][prop] = func.bind db


pgp = require('pg-promise') options
if not production
  monitor = require 'pg-monitor'
  monitor.attach options

url = process.env.DATABASE_URL
url += '?ssl=true'
db = pgp url
module.exports = {db, pgp}
