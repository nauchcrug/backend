const {db} = require(lib + 'db');

exports.list = function(data) {
  var sql;
  sql = 'select * from users';
  return db.query(sql);
};

exports.create = function(login, password, status = 0) {
  let rate = 0;
  return sql = {
    insert: 'insert into users values($1, $2, $3, $4)',
    get: 'select login, password from users\nwhere login=$1, password=$2'
  };
};

exports.exists = (login, password) => {
  var sql;
  sql = 'select login, password from users\nwhere login=$1';
  return db.query(sql, [login, password])
    .then(user => {
      let {login, password} = user;
      if (!login || !password) {
        console.log(user);
        return true;
      }
    });
};

exports.update = function (name,surname,email,about,school,home,subject){
    var sql = ("UPDATE users SET username='%s', surname='%s', email='%s', about='%s', school='%s', home='%s', subject='%s'", name,surname,email,about,school,home,subject);
    db.none(sql);
};
