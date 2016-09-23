require('app-module-path').addPath(__dirname);
require('isomorphic-fetch');
const config = require('app/config');
const {
  PORT = config.port,
  HOST = config.host,
  SCALE = config.scale,
  NODE_ENV = '',
  npm_lifecycle_event = ''
} = process.env;

global.__DEV__ = (NODE_ENV != 'production');
global.__TEST__ = (
  (a, b) => (a ? !b : b)
)(
  /test/.test(npm_lifecycle_event,
  NODE_ENV == 'test'
));

if (!global.production) {
  require('dotenv/config');
}

const app = require('app/index');
const domain = require('domain');
let d = domain.create();
d.on('error', err => {
  console.error("Catched error in domain: %s", err.message);
});

/* TODO: Better app logging
const logger = riequire('app/logger');
*/

if (!global.test && !module.parent) {
  const http = require('http');

  //d.add(app);
  d.run(() => {
    const server = http.createServer(app);
    server.listen(PORT, HOST, err => {
      if (err) d.emit('error', err);
      console.log(`Express listening on ${HOST}:${PORT}`);
    });
  });
} else {
}

module.exports = app;

