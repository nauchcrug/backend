options =
  connect: (client, dc, isFresh) ->
    cp = client.connectionParameters
    console.log "Connected to database #{cp.database}"


pgp = require('pg-promise') options
{parse} = require 'pg-connection-string'
url = process.env.DATABASE_URL

# SSL fix
config = parse url
config.ssl = on

db = pgp config
module.exports = db
