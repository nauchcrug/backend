pgp = do require 'pg-promise'
url = process.env.DATABASE_URL
#url.replace /^postgres/, '$&+ssl'

# SSL fix
{parse} = require 'pg-connection-string'
config = parse url
config.ssl = on

db = pgp config
module.exports = db
