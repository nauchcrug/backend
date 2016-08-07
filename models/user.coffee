{db} = require lib + 'db'

exports.list = (data) ->
  sql = 'select * from users'
  db.query sql
