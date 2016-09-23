const pgp = require('pg-promise')({
/* pg-promise options */
});

/* Attach request monitor on development */
if (__DEV__ && !__TEST__) {
    const monitor = require('pg-monitor');
    monitor.attach({
        /* pg-monitor options */
    });
}


let url = process.env.DATABASE_URL + '?ssl=true';
const db = pgp(url);
/* pgp instance: db.$config.pgp */

module.exports = db;
