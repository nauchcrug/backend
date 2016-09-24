require('app-module-path/cwd') /*.addPath(__dirname);*/
require('isomorphic-fetch');
const config = require('app/config');

const {
  PORT = config.port,
  HOST = config.host,
  SCALE = config.scale,
  NODE_ENV = '',
  npm_lifecycle_event = ''
} = process.env;

global.XOR = (a, b) => a ? !b : b;
global.__DEV__ = (NODE_ENV != 'production');
global.__TEST__ = XOR(
  /test/.test(npm_lifecycle_event),
  NODE_ENV == 'test'
);
global.__PROD__ = !XOR(__DEV__, __TEST__)

if (__DEV__) {
  require('dotenv/config');
}

module.exports = app = require('app/index');

if (/migrate/.test(process.argv[2])) {
    require('app/migrate')({
        name: process.argv[3],
        verbose: true
    });
} else if (!__TEST__ && !module.parent) {
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
