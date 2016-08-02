{Router} = require 'express'
router = new Router
pg = require 'pg'
pg.defaults.ssl = on

router.get '/', (req, res, next) ->
  res.set 'Content-Type', 'application/json'
  pg.connect process.env.DATABASE_URL, (err, client) ->
    if err then throw err
    console.log 'Connection to Postgres...'
    client
      .query 'select table_schema,table_name from information_schema.tables'
      .on 'row', (row) -> res.write JSON.stringify row
        
module.exports = router
