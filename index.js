require('app-module-path').addPath(process.cwd());
require('lib/sql').hook();

const {TARGET} = require('lib/util');
Object.keys(TARGET).forEach(key => global[key] = TARGET[key]);

!global.production ? require('dotenv/config') : void 0;
const {PORT, HOST, npm_lifecycle_event} = process.env;
const app = require('lib/app');

if (!global.test && !module.parent)
  app.listen(PORT, HOST, err => err
    ? console.error(err)
    : console.log(`Express listening on ${HOST}:${PORT}`)
  );

module.exports = app;

