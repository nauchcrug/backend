{Router} = require 'express'
router = new Router
pgp = (require 'pg-promise') {} 
#pgp.defaults.ssl = on

db = pgp process.env.DATABASE_URL
sql = 'select table_schema,table_name from information_schema.tables'

router.get '/', (req, res, next) ->
  console.log 'db req'
  db.one sql
    .then (data) ->
      console.log "data: #{data}"
      res.send data
    .then null, (err) ->
      throw err
 
module.exports = router
