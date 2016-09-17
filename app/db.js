const pgp = require('pg-promise')({
/* pg-promise options */
});

/* Attach request monitor on development */
if (!production && !test) {
  const monitor = require('pg-monitor');
  monitor.attach(options);
}

let url = process.env.DATABASE_URL + '?ssl=true';

const db = pgp(url);
module.exports = {db, pgp};
