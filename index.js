require('app-module-path').addPath(process.cwd());
require('lib/sql').hook();

if (process.env.NODE_ENV != 'production') {
  global.production = (process.env.NODE_ENV === 'production');
  require('dotenv/config');
}
const {PORT, HOST, npm_lifecycle_event} = process.env;

if (npm_lifecycle_event != 'test') {
  const app = require('lib/app');
  app.listen(PORT, HOST, () =>
    console.log(`Express listening on ${HOST}:${PORT}`)
  );
}
