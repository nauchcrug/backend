require('app-module-path').addPath(process.cwd());
require('./lib/sql').hook();

if (process.env.NODE_ENV != 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const {NODE_ENV, PORT, HOST} = process.env;
global.production = (NODE_ENV === 'production');

const app = require('./lib/app');
const {createServer} = require('http');

server = createServer(app);
server.listen(PORT, HOST, ev =>
  console.log(`Express listening on port ${HOST}:${PORT}`)
);
//server.on('error', (e) => console.log(`Got error: ${e.message}`));
