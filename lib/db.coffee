options = {}

pgp = require('pg-promise') options
if not production
  monitor = require 'pg-monitor'
  monitor.attach options

url = process.env.DATABASE_URL
url += '?ssl=true'
db = pgp url

module.exports = {db, pgp}
