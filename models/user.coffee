exports.list = (data) ->
  sql = 'select * from users'
  db = this
  db.query sql
