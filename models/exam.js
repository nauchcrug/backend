const {db} = require(lib + 'db');

exports.add = (subject, exam) => db.none(`
  insert into exams (
    subject, option, exam
  ) values ($1, $2, $3)
`, [subject, option, exam]);

exports.get = (subject, option) => db.query(`
  select exam from exams
  where subject=$1, option=$2
`, [subject, option]);
