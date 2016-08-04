{Router} = require 'express'
db = require '../db'
router = new Router
sql = 'select table_name from information_schema.tables'

router.get '/', (req, res, next) ->
  res.set 'Content-Type', 'application/json'
  db.query sql
    .then (data) -> res.send JSON.stringify data
    .then null, (err) -> console.error err

module.exports = router
