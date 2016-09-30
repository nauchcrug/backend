require('app-module-path/cwd');
require('isomorphic-fetch');
const config = require('app/config');

if (process.env.NODE_ENV != 'production') {
  require('dotenv/config');
}

const {
  PORT = config.port,
  SCALE = config.scale,
  DATABASE_URL = config.database_url,
  NODE_ENV = '',
  npm_lifecycle_event = ''
} = process.env;

global.__DEV__ = (NODE_ENV != 'production');
global.__TEST__ = /test/.test(npm_lifecycle_event);
global.__PROD__ = !(__DEV__ ? !__TEST__ : __TEST__);
const HOST = __DEV__ ? config.host : undefined;

module.exports = global.__APP__ = app = require('app');

if (/migrate/.test(process.argv[2])) require('app/migrate')({
    name: process.argv[3],
    verbose: true
})
else if (!__TEST__ && !module.parent) {
    app.listen(PORT, HOST, err => {
        if (err) throw err;
        console.log(`Express listening on ${HOST}:${PORT}`);
    });
}
