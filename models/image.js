const {db} = require('lib/db');

exports.get = id => {
  sql = 'select file from images where id=$1';
  return db.query(sql, [id]);
};

exports.add = (name, type, size, content) => {
  sql = 'insert into images values($1, $2, $3)';
  return db.query(sql, [name, type, size, content]);
};
