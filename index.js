require('app-module-path').addPath(process.cwd());
require('lib/sql').hook();

global.production = (process.env.NODE_ENV === 'production');
!production ? require('dotenv/config') : void 0;
const {PORT, HOST, npm_lifecycle_event} = process.env;
const app = require('lib/app');

if (npm_lifecycle_event != 'test' && !module.parent) {
  const {createServer} = require('http');
  server = createServer(app);
  server.listen(PORT, HOST, err => err
    ? console.error(err)
    : console.log(`Express listening on ${HOST}:${PORT}`)
  server.listen(PORT, HOST, () =>
    console.log(`Express listening on ${HOST}:${PORT}`)
  );
}

module.exports = app;

