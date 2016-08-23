const options = {};
const pgp = require('pg-promise')(options);

if (!production && !test) {
  const monitor = require('pg-monitor');
  monitor.attach(options);
}

let url = process.env.DATABASE_URL;
url += '?ssl=true'; // SSLify
const db = pgp(url);

module.exports = {db, pgp};
