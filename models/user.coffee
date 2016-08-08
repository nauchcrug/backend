exports.list = (data) ->
  sql = 'select * from users'
  db.query sql

exports.create = (login, password, status) ->
  rate = 0
  status = 0
  sql =
    insert: 'insert into users values($1, $2, $3, $4)'
    get: '''
      select login, password from users
      where login=$1, password=$2
    '''
exports.exists = (login, password) ->
  sql = '''
    select login, password from users
    where login=$1
  '''
  db.query sql
    .then (user) ->
      if not user.login? then return yes
      else if user.password? then yes
