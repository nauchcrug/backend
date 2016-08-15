require('app-module-path').addPath(process.cwd());
require('lib/sql').hook();

global.production = (process.env.NODE_ENV === 'production');
!production ? require('dotenv/config') : void 0 
const {PORT, HOST, npm_lifecycle_event} = process.env;

if (npm_lifecycle_event != 'test') {
  const app = require('lib/app');
  app.listen(PORT, HOST, () =>
    console.log(`Express listening on ${HOST}:${PORT}`)
  );
}
