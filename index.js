require('app-module-path/cwd');
require('isomorphic-fetch');
const config = require('app/config');

if (process.env.NODE_ENV != 'production') {
  require('dotenv/config');
}

const {
  PORT = config.port,
  HOST = config.host,
  SCALE = config.scale,
  DATABASE_URL = config.database_url,
  NODE_ENV = '',
  npm_lifecycle_event = ''
} = process.env;

global.__DEV__ = (NODE_ENV != 'production');
global.__TEST__ = /test/.test(npm_lifecycle_event);
global.__PROD__ = !(__DEV__ ? !__TEST__ : __TEST__);

module.exports = app = require('app');
global.__APP__ = app;

if (/migrate/.test(process.argv[2])) require('app/migrate')({
    name: process.argv[3],
    verbose: true
})
else if (!__TEST__ && !module.parent) {
    const http = require('http');
    const domain = require('domain');

    const d = domain.create();
    d.on('error', err => {
        console.error("Catched error in domain: %s", err.message);
    });

    d.run(() => {
        const server = http.createServer(app);
        server.listen(PORT, HOST, err => {
            if (err) d.emit('error', err);
            console.log(`Express listening on ${HOST}:${PORT}`);
        });
    });
}
