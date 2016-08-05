fs = require 'fs'
dotenv = require 'dotenv/config'
db = require './db'

migration = process.argv[2]
file = "./migrations/#{migration}.sql"

if not migration?
  console.log 'No migration specified. It must be SQL file'
  process.exit(1)
else
  fs.access file, fs.constants.R_OK, (err) ->
    throw err if err
    fs.readFile file, encoding: 'utf8', (err, data) ->
      throw err if err
      console.log "Applying migration..."
      db.query data
        .then (result) ->
          console.log "Result: #{result}"
        .then null, (err) ->
          throw err if err
