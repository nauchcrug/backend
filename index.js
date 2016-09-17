require('app-module-path').addPath(process.cwd());
require('app/lib/sql').hook();
require('isomorphic-fetch');

/* Apply global environment variables */
const {TARGET} = require('app/lib/util');
Object.keys(TARGET).forEach(key => global[key] = TARGET[key]);

if (!global.production) require('dotenv/config');
const {PORT, HOST, npm_lifecycle_event} = process.env;
const app = require('app/');

if (!global.test && !module.parent)
  app.listen(PORT, HOST, err => err
    ? console.error(err)
    : console.log(`Express listening on ${HOST}:${PORT}`)
  );

module.exports = app;

